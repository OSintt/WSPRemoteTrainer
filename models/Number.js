import { Schema, model } from "mongoose";
const NumberSchema = new Schema({
  nombre: String,
  cedula: {
    type: String,
    required: true,
  },
  fecha_defuncion: Date,
  telefono: {
    type: String,
    required: true,
  },
  eliminar: {
    type: Boolean,
    default: false,
  },
  causa: String,
});

export default model(NumberSchema, "Number");
