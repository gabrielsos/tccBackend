"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var db = knex_1.default({
    client: 'mysql',
    connection: {
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10372774',
        password: 'nVpA17xV5W',
        database: 'sql10372774',
    },
    useNullAsDefault: true,
});
exports.default = db;
