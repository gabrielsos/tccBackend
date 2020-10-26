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
var connection_1 = __importDefault(require("../database/connection"));
var currentDate_1 = __importDefault(require("../utils/currentDate"));
var OsController = /** @class */ (function () {
    function OsController() {
    }
    OsController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var os;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('os')
                            .join('osType', 'os.osTypeId', '=', 'osType.osTypeId')
                            .join('osState', 'os.osStateId', '=', 'osState.osStateId')
                            .join('equipmentOs', function () {
                            this.on('os.osId', '=', 'equipmentOs.osId').andOn('os.osDateInit', '=', 'equipmentOs.osDateInit');
                        })
                            .join('equipment', 'equipmentOs.equipmentSerialNumber', '=', 'equipment.equipmentSerialNumber')
                            .join('local', 'equipment.localId', '=', 'local.localId')
                            .join('users', 'os.loginName', '=', 'users.loginName')
                            .select('os.osId', connection_1.default.raw("date_format(os.osDateInit, '%Y/%m/%d %T') as initDate"), connection_1.default.raw("date_format(os.osDateInit, '%d/%m/%Y %T') as rightInitDate"), 'os.osDescription', connection_1.default.raw("date_format(os.osDateFinal, '%d/%m/%Y %T') as rightFinalDate"), 'osType.typeName', 'osState.osStateName', 'local.localName', 'users.name', connection_1.default.raw("GROUP_CONCAT(??.?? separator ', ') as equip", [
                            'equipment',
                            'equipmentName',
                        ]))
                            .groupBy('os.osId', 'os.osDateInit')
                            .orderBy('osStateName')
                            .orderBy('os.osDateInit', 'desc')
                            .where('os.osStateId', '<>', 2)];
                    case 1:
                        os = _a.sent();
                        return [2 /*return*/, response.json(os)];
                }
            });
        });
    };
    OsController.prototype.getOsBySerialNumber = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var equipmentSerialNumber, os;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        equipmentSerialNumber = request.params.equipmentSerialNumber;
                        return [4 /*yield*/, connection_1.default('os')
                                .join('osType', 'os.osTypeId', '=', 'osType.osTypeId')
                                .join('osState', 'os.osStateId', '=', 'osState.osStateId')
                                .join('equipmentOs', function () {
                                this.on('os.osId', '=', 'equipmentOs.osId').andOn('os.osDateInit', '=', 'equipmentOs.osDateInit');
                            })
                                .join('equipment', 'equipmentOs.equipmentSerialNumber', '=', 'equipment.equipmentSerialNumber')
                                .join('local', 'equipment.localId', '=', 'local.localId')
                                .join('users', 'os.loginName', '=', 'users.loginName')
                                .select('os.osId', connection_1.default.raw("date_format(os.osDateInit, '%Y/%m/%d %T') as initDate"), connection_1.default.raw("date_format(os.osDateInit, '%d/%m/%Y %T') as rightInitDate"), 'os.osDescription', connection_1.default.raw("date_format(os.osDateFinal, '%d/%m/%Y %T') as rightFinalDate"), 'osType.typeName', 'osState.osStateName', 'local.localName', 'users.name', connection_1.default.raw("GROUP_CONCAT(??.?? separator ', ') as equip", [
                                'equipment',
                                'equipmentName',
                            ]))
                                .groupBy('os.osId', 'os.osDateInit')
                                .orderBy('osStateName')
                                .orderBy('os.osDateInit', 'desc')
                                .where('equipmentOs.equipmentSerialNumber', '=', equipmentSerialNumber)];
                    case 1:
                        os = _a.sent();
                        return [2 /*return*/, response.json(os)];
                }
            });
        });
    };
    OsController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var os;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('os')
                            .join('osType', 'os.osTypeId', '=', 'osType.osTypeId')
                            .join('osState', 'os.osStateId', '=', 'osState.osStateId')
                            .join('equipmentOs', function () {
                            this.on('os.osId', '=', 'equipmentOs.osId').andOn('os.osDateInit', '=', 'equipmentOs.osDateInit');
                        })
                            .join('equipment', 'equipmentOs.equipmentSerialNumber', '=', 'equipment.equipmentSerialNumber')
                            .join('local', 'equipment.localId', '=', 'local.localId')
                            .join('users', 'os.loginName', '=', 'users.loginName')
                            .select('os.osId', connection_1.default.raw("date_format(os.osDateInit, '%Y/%m/%d %T') as initDate"), connection_1.default.raw("date_format(os.osDateInit, '%d/%m/%Y %T') as rightInitDate"), 'os.osDescription', connection_1.default.raw("date_format(os.osDateFinal, '%d/%m/%Y %T') as rightFinalDate"), 'osType.typeName', 'osState.osStateName', 'local.localName', 'users.name', connection_1.default.raw("GROUP_CONCAT(??.?? separator ', ') as equip", [
                            'equipment',
                            'equipmentName',
                        ]))
                            .groupBy('os.osId', 'os.osDateInit')
                            .orderBy('os.osDateInit', 'desc')];
                    case 1:
                        os = _a.sent();
                        return [2 /*return*/, response.json(os)];
                }
            });
        });
    };
    OsController.prototype.indexId = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var loginName, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginName = request.headers.authorization;
                        return [4 /*yield*/, connection_1.default('os')
                                .join('osType', 'os.osTypeId', '=', 'osType.osTypeId')
                                .join('osState', 'os.osStateId', '=', 'osState.osStateId')
                                .join('equipmentOs', function () {
                                this.on('os.osId', '=', 'equipmentOs.osId').andOn('os.osDateInit', '=', 'equipmentOs.osDateInit');
                            })
                                .join('equipment', 'equipmentOs.equipmentSerialNumber', '=', 'equipment.equipmentSerialNumber')
                                .join('local', 'equipment.localId', '=', 'local.localId')
                                .select('os.osId', connection_1.default.raw("date_format(os.osDateInit, '%Y/%m/%d %T') as initDate"), connection_1.default.raw("date_format(os.osDateInit, '%d/%m/%Y %T') as rightInitDate"), 'os.osDescription', connection_1.default.raw("date_format(os.osDateFinal, '%d/%m/%Y %T') as rightFinalDate"), 'osType.typeName', 'osState.osStateName', 'local.localName', connection_1.default.raw("GROUP_CONCAT(??.?? separator ', ') as equip", [
                                'equipment',
                                'equipmentName',
                            ]))
                                .where('loginName', loginName)
                                .groupBy('os.osId', 'os.osDateInit')
                                .orderBy('os.osDateInit', 'desc')];
                    case 1:
                        profile = _a.sent();
                        return [2 /*return*/, response.json(profile)];
                }
            });
        });
    };
    OsController.prototype.registersId = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, osRegisters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default('osRegisters')
                                .join('users', 'osRegisters.loginName', '=', 'users.loginName')
                                .select(connection_1.default.raw("date_format(osRegisters.osRegisterDate, '%d/%m/%Y %T') as rightDate"), 'users.name as name', 'osRegisters.osRegisterDescription', 'osId', 'osRegisterDate')
                                .where('osId', Number(id))
                                .orderBy('osRegisterDate', 'desc')];
                    case 1:
                        osRegisters = _a.sent();
                        return [2 /*return*/, response.json(osRegisters)];
                }
            });
        });
    };
    OsController.prototype.newRegister = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var osRegisterDate, _a, osRegisterDescription, loginName, osId, osDateInit, selectedOsState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        osRegisterDate = currentDate_1.default();
                        _a = request.body, osRegisterDescription = _a.osRegisterDescription, loginName = _a.loginName, osId = _a.osId, osDateInit = _a.osDateInit, selectedOsState = _a.selectedOsState;
                        return [4 /*yield*/, connection_1.default('osRegisters').insert({
                                osId: osId,
                                osDateInit: osDateInit,
                                osRegisterDate: osRegisterDate,
                                loginName: loginName,
                                osRegisterDescription: osRegisterDescription,
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, connection_1.default('os')
                                .update('osStateId', selectedOsState)
                                .where('osId', osId)
                                .where('osDateInit', osDateInit)];
                    case 2:
                        _b.sent();
                        if (!(selectedOsState === '2')) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection_1.default('os')
                                .update('osDateFinal', currentDate_1.default())
                                .where('osId', osId)
                                .where('osDateInit', osDateInit)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, response.json({
                            osDateInit: osDateInit,
                            osId: osId,
                            loginName: loginName,
                            osRegisterDescription: osRegisterDescription,
                            osRegisterDate: osRegisterDate,
                        })];
                }
            });
        });
    };
    OsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var osDateInit, _a, osDescription, osTypeId, equipmentSerialNumber, loginName, osId, newOsId, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        osDateInit = currentDate_1.default();
                        _a = request.body, osDescription = _a.osDescription, osTypeId = _a.osTypeId, equipmentSerialNumber = _a.equipmentSerialNumber, loginName = _a.loginName;
                        return [4 /*yield*/, connection_1.default('os').max('osId as id').first()];
                    case 1:
                        osId = _b.sent();
                        if (osId) {
                            newOsId = Number(osId.id) + 1;
                        }
                        return [4 /*yield*/, connection_1.default('os').insert({
                                osId: newOsId,
                                osDateInit: osDateInit,
                                osDescription: osDescription,
                                osTypeId: osTypeId,
                                osStateId: 1,
                                loginName: loginName,
                            })];
                    case 2:
                        _b.sent();
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(equipmentSerialNumber.length > i)) return [3 /*break*/, 6];
                        return [4 /*yield*/, connection_1.default('equipmentOs').insert({
                                equipmentSerialNumber: equipmentSerialNumber[i],
                                osId: newOsId,
                                osDateInit: osDateInit,
                            })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, response.json({
                            osDateInit: osDateInit,
                            osId: osId,
                            osDescription: osDescription,
                            loginName: loginName,
                            equipmentSerialNumber: equipmentSerialNumber,
                        })];
                }
            });
        });
    };
    return OsController;
}());
exports.default = OsController;
