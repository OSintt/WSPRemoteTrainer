"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, //init
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _helmet = /*#__PURE__*/ _interop_require_default(require("helmet"));
const _morgan = /*#__PURE__*/ _interop_require_default(require("morgan"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
//settings
app.set("port", process.env.PORT || 3000);
//middleware
app.use((0, _morgan.default)("dev"));
app.use((0, _cors.default)({
    origin: "*"
}));
app.use((0, _helmet.default)({
    crossOriginOpenerPolicy: {
        policy: "unsafe-none"
    }
}));
app.use(_express.default.json());
//routes
app.use("/v1", require("./routes/api"));
app.use("*", (req, res)=>res.status(404).json({
        status: 404,
        message: "Página no encontrada"
    }));
const _default = app;
