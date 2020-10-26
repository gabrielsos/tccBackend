"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var crypto_1 = __importDefault(require("../utils/crypto"));
var connection_1 = __importDefault(require("../database/connection"));
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.indexAdmin = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('users')
                            .select('loginName', 'name', 'email', 'userType')
                            .where('userType', '=', '0')];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, response.json(users)];
                }
            });
        });
    };
    LoginController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var loginName, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginName = request.params.loginName;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, connection_1.default('users').delete('*').where('loginName', '=', loginName)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json({ sucess: 'deleted' }).status(200)];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, response.status(400).json(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.indexUsers = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('users')
                            .select('loginName', 'name', 'email', 'userType')
                            .where('userType', '<>', '0')];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, response.json(users)];
                }
            });
        });
    };
    LoginController.prototype.newPassword = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, loginName, password;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, loginName = _a.loginName, password = _a.password;
                        return [4 /*yield*/, connection_1.default('users')
                                .update('password', password)
                                .where('loginName', loginName)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, connection_1.default('users')
                                .update('passwordExpired', 0)
                                .where('loginName', loginName)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, loginName, email, name, userType, password, config, transporter, message, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, loginName = _a.loginName, email = _a.email, name = _a.name, userType = _a.userType;
                        password = crypto_1.default();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, connection_1.default('users').insert({
                                loginName: loginName,
                                name: name,
                                email: email,
                                password: password,
                                userType: userType,
                                passwordExpired: 1,
                            })];
                    case 2:
                        _b.sent();
                        config = {
                            host: 'smtp.gmail.com',
                            port: 587,
                            auth: {
                                user: 'projetorose2019@gmail.com',
                                pass: 'projrose2019',
                            },
                        };
                        transporter = nodemailer_1.default.createTransport(config);
                        message = {
                            from: 'projetorose2019@gmail.com',
                            to: email,
                            subject: 'Criação de conta',
                            text: "Ol\u00E1 " + name + ".\nSua conta foi criada no sistema de ordem de servi\u00E7o de nossa empresa!\n\nPara acessar o sistema use suas credenciais:\n\nUsu\u00E1rio: " + loginName + "\nSenha: " + password,
                        };
                        transporter.sendMail(message, function (error, info) {
                            if (error) {
                                console.log('erro ao enviar email');
                            }
                        });
                        return [2 /*return*/, response.status(201).json({ loginName: loginName, email: email, name: name, userType: userType })];
                    case 3:
                        err_2 = _b.sent();
                        return [2 /*return*/, response.status(404).json(err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, loginName, email, name, userType, password, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, loginName = _a.loginName, email = _a.email, name = _a.name, userType = _a.userType, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, connection_1.default('users')
                                .update('email', email)
                                .update('name', name)
                                .update('userType', userType)
                                .where('loginName', '=', loginName)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.json({ sucess: 'updated' }).status(200)];
                    case 3:
                        err_3 = _b.sent();
                        return [2 /*return*/, response.status(400).json(err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LoginController;
}());
exports.default = LoginController;
