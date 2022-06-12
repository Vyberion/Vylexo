"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMS_1 = require("./getMS");
function default_1(number, max, expanded, obj, till) {
    var _a;
    let time = "", data = {}, negative = number < 0;
    if (negative)
        time = "-";
    number = Math.abs(number);
    while (number > 0 && max > 0) {
        let ms = (0, getMS_1.default)(number);
        data[ms.type] = ms.value * (negative ? -1 : 1);
        number = ms.time;
        time += ms.string;
        max--;
        if (till === ms.type)
            number = 0;
    }
    if (!expanded)
        time = (_a = time.replace(/(year|day|hour|minute|second)s?/g, x => x[0])) === null || _a === void 0 ? void 0 : _a.replace(/millisecond+s?/, "ms");
    return obj ? data : time;
}
exports.default = default_1;
