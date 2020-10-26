"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
function randomDigits() {
    var password = crypto_1.default.randomBytes(8).toString('hex');
    return password;
}
exports.default = randomDigits;
