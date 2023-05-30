import whatsAppClient from "@green-api/whatsapp-api-client";
import Numbers from "../models/Number";
import Message from "../models/Message";
import arr from "./arr";

const questions = [
  {
    q: '¿Cuánto debo?', 
    a: 'Por favor adjuntar una copia del comprobante de pago'
  }, 
  {
    q: 'El deudor falleció',
    a: 'Por favor acercarse a una de las agencias antes detalladas con el certificado de defunción para poner en conocimiento del particular'
  },
  {
    q: 'Ya pagué mi deuda', 
    a: 'Por favor adjuntar una copia del comprobante de pago'
  },
  {
    q: 'Número equivocado', 
    a: 'Por favor comunicarse al número de teléfono 0996369926 a fin de poder eliminar su registro de la base de datos'
  }, 
  {
    q: 'Deseo saber el número y tipo de servicio al que corresponde esta deuda',
    a: 'Por favor enviar su número de cédula al número de teléfono 0996369926 y preguntar con la leyenda "necesito número y tipo de servicio'
  }
];

const initialRes = `Buenos días, soy un servicio de ayuda automático. 
Para más información sobre su deuda envíe el número según su pregunta correspondiente:\n${questions.map((q, i) => `[${i + 1}] ${q.q}`).join('\n')}`;

const restAPI = whatsAppClient.restAPI({
  idInstance: process.env.ID,
  apiTokenInstance: process.env.API_KEY,
});

const listen = async (req, res) => {
  await restAPI.webhookService.startReceivingNotifications();
  console.log("receiving notificación");
  restAPI.webhookService.onReceivingMessageText(async (body) => {
    if (body.senderData.chatId.endsWith("@g.us")) return;
    try {
      const client = await Numbers.findOne({
        telefono: {
          $regex: new RegExp(`^${body.senderData.chatId.replace("593", "")}`),
        },
      });
      const msg = body.messageData.textMessageData.textMessage;
      const filter = msg == 2 || msg == 3 || msg == 4;
      const answer = isNaN(msg) ? initialRes : `*${questions[Number(msg) - 1].q}:*\n${questions[Number(msg) - 1].a}` || initialRes;
      if (client) {
        const newMsg = new Message({
          author: client._id,
          content: msg,
          date: new Date()
        });
        await newMsg.save(); 
        if (filter) {
          if (client.eliminar) return;
          client.eliminar = true;
          client.causa = msg;
          await client.save(); 
        }
      }

      const mes = await restAPI.message.sendMessage(body.senderData.sender, null, answer);
      console.log(mes);
    } catch (e) {
      console.log(e);
    }
  });
  res.send({
    status: 200,
    message: `La máquina con el ID ${process.env.ID} está escuchando...`,
  });
};

const training = async (req, res) => {
  async function chat() {
    const responses = await arr();
    try {
      const response = await restAPI.message.sendMessage(
        process.env.GROUP_ID,
        null,
        responses[Math.floor(Math.random() * responses.length)]
      );
      console.log(response);
    } catch (e) {
      console.log("Ha ocurrido un error inesperado:", e);
    }
  }
  chat();
  res.send({
    status: 200,
    message: `La máquina con el ID ${process.env.ID} está entrando...`,
  });
  setInterval(chat, 60 * 1000);
};

export { training, listen };
