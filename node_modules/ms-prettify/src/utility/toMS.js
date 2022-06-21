"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getType_1 = require("./getType");
const justANumber_1 = require("./justANumber");
/**
 * Convert Human readable time to milliseconds.
 * @param {String} string The human readable time string.
 * @returns {Number} The time in milliseconds.
 */
function default_1(string) {
    var _a, _b;
    const strings = (_b = (_a = string.toLowerCase()) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.split(/ +/g);
    let negative = string.startsWith("-"), number = 0, fails = 0, trials = 0;
    strings.forEach((v, i) => {
        var _a, _b, _c, _d;
        trials++;
        // Value is a number
        if ((0, justANumber_1.default)(v)) {
            let t = Math.abs(parseInt(v));
            if ((0, justANumber_1.default)(strings[i + 1]) || !strings[i + 1]) {
                number += t;
                fails--;
            } // Next value is also a number
            else {
                let value = (0, getType_1.default)((_a = strings[i + 1].trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase());
                if (value)
                    number += value * t;
                else
                    fails++;
            }
        }
        else {
            let no = Math.abs(parseInt(v)), str = (_d = (_c = v.substring((_b = no.toString()) === null || _b === void 0 ? void 0 : _b.length)) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.toLowerCase();
            let value = (0, getType_1.default)(str);
            if (value && no)
                number += no * value;
            else
                fails++;
        }
    });
    return fails === strings.length ? undefined : number * (negative ? -1 : 1);
}
exports.default = default_1;
