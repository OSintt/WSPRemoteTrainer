"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
const _dotenv = require("dotenv");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _dotenv.config)();
_mongoose.default.connect(process.env.URI).then((db)=>console.log('DB Connected'));
