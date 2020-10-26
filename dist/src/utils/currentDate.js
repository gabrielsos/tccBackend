"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function currentDate() {
    var dNow = new Date();
    var localdate = dNow.getFullYear() + "-" + (dNow.getMonth() + 1) + "-" + dNow.getDate() + " " + dNow.getHours() + ":" + dNow.getMinutes() + ":" + dNow.getSeconds();
    return localdate;
}
exports.default = currentDate;
