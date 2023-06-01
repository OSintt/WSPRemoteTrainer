import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import axios from 'axios';
import ApiKey from "./models/ApiKey";
const key = await ApiKey.find();
axios.defaults.headers.common['api-key'] = key[0].key;
const app = express();

//settings
app.set("port", process.env.PORT || 3000);
//middleware
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet({ crossOriginOpenerPolicy: { policy: "unsafe-none" } }));
app.use(express.json());

//routes
app.use("/v1", require("./routes/api"));
app.use("*", (req, res) =>
  res
    .status(404)
    .json({ status: 404, message: "Página no encontrada" })
);
//init
export default app;