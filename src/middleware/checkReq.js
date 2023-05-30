import Key from "../models/ApiKey";

const checkKey = async (req, res, next) => {
  const key = req.headers["api-key"];
  if (!key)
    return res.status(401).json({
      status: 401,
      message: "Debes colocar una API Key para usar nuestra API",
    });
  const verifiedKey = await Key.findOne({ key });
  if (!verifiedKey)
    return res.status(401).json({
      status: 401,
      message: "La API Key que proporcionaste es inválida",
    });
  return next();
};

export { checkKey };


