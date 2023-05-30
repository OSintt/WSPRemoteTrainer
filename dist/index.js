"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("./db");
const _app = /*#__PURE__*/ _interop_require_default(require("./app"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const main = ()=>{
    _app.default.listen(_app.default.get('port'), ()=>console.log('Server running on port', _app.default.get('port')));
};
main();
