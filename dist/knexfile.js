"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
module.exports = {
    client: 'mysql',
    connection: {
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10372774',
        password: 'nVpA17xV5W',
        database: 'sql10372774',
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: true,
};
