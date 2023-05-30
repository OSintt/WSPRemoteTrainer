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
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function arr() {
    try {
        const texto = await _fs.default.promises.readFile(_path.default.join(__dirname, "/arr.txt"), "utf-8");
        return texto.split("\n");
    } catch (err) {
        console.error("Ocurrió un error:", err);
        return [];
    }
}
const _default = arr;
