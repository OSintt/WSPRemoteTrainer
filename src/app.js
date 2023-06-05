import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.set("id", process.env.ID)
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