import whatsAppClient from "@green-api/whatsapp-api-client";
import Number from "../models/Number";
import Message from "../models/Message";
import arr from "./arr";

const restAPI = whatsAppClient.restAPI({
  idInstance: process.env.ID,
  apiTokenInstance: process.env.API_KEY,
});

const listen = async () => {
  const initialRes = `
      Buenos días, soy un servicio de ayuda automático. 
      Para más información sobre su deuda envíe el número según su pregunta correspondiente:
  
      [1] ¿Cuánto debo?
      [2] El deudor falleció
      [3] Ya pagué mi deuda
      [4] Número equivocado
      [5] Deseo saber el número y tipo de servicio al que corresponde esta deuda`;
  let answer;
  const freqAnsw = {
    1: () =>
      (answer = `
      [1] ¿Cuánto debo?: 
      Por favor acérquese a una de las agencias cercana a su domicilio`),
    2: () => {
      answer = `
      [2] El deudor ya falleció: 
      Por favor acercarse a una de las agencias antes detalladas con el certificado de defunción para poner en conocimiento del particular`;
    },
    3: () =>
      (answer = `
      [3] Ya pagué mi deuda: Por favor adjuntar una copia del comprobante de pago`),
    4: () =>
      (answer = `[4] Número equivocado:
      Por favor comunicarse al número de teléfono 0996369926 a fin de poder eliminar su registro de la base de datos`),
    5: () =>
      (answer = `
      [5] Deseo saber el número y tipo de servicio al que corresponde esta deuda
      Por favor enviar su número de cédula al número de teléfono 0996369926 y preguntar con la leyenda "necesito número y tipo de servicio"`),
    none: () => (answer = initialRes),
  };

  await restAPI.webhookService.startReceivingNotifications();
  console.log("receiving notificación");
  restAPI.webhookService.onReceivingMessageText(async (body) => {
    if (body.senderData.chatId.endsWith("@g.us")) return;
    try {
      const client = await Number.findOne({
        telefono: {
          $regex: new RegExp(`^${body.senderData.chatId.replace("593", "")}`),
        },
      });
      const msg = body.messageData.textMessageData.textMessage;
      const filter = msg == 2 || msg == 3 || msg == 4;
      await (freqAnsw[msg] || freqAnsw["none"])();
      if (client) {
        const newMsg = new Message({
          author: client._id,
          content: msg,
          date: new Date()
        });
        await newMsg.save();
        if (client.eliminar && filter) return;
      }
      if (filter) {
        client.eliminar = true;
        client.causa = msg;
        await client.save();
      }
      await restAPI.message.sendMessage(body.senderData.sender, null, answer);
    } catch (e) {
      console.log(e);
    }
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
  const listenPromise = new Promise((resolve) => {
    listen();
    resolve();
  });
  await listenPromise;
  res.send({
    status: 200,
    message: `La máquina con el ID ${process.env.ID} está funcionando...`,
  });
  setInterval(chat(), 60 * 1000);
};

export { training };