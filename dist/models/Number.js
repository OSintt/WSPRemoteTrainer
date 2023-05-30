"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _mongoose = require("mongoose");
const NumberSchema = new _mongoose.Schema({
    nombre: String,
    cedula: {
        type: String,
        required: true
    },
    fecha_defuncion: Date,
    telefono: {
        type: String,
        required: true
    },
    eliminar: {
        type: Boolean,
        default: false
    },
    causa: String
});
const _default = (0, _mongoose.model)("Number", NumberSchema);
