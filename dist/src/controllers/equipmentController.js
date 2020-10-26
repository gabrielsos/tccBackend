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
var equipmentController = /** @class */ (function () {
    function equipmentController() {
    }
    equipmentController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var equipment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('equipment')
                            .select('*')
                            .join('local', 'equipment.localId', '=', 'local.localId')];
                    case 1:
                        equipment = _a.sent();
                        return [2 /*return*/, response.json(equipment)];
                }
            });
        });
    };
    equipmentController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var equipmentSerialNumber, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        equipmentSerialNumber = request.params.equipmentSerialNumber;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, connection_1.default('equipment')
                                .delete('*')
                                .where('equipmentSerialNumber', '=', equipmentSerialNumber)];
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
    equipmentController.prototype.indexId = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var localId, equipment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localId = request.params.localId;
                        return [4 /*yield*/, connection_1.default('equipment')
                                .select('equipmentName', 'equipmentSerialNumber', 'localId')
                                .where('localId', localId)];
                    case 1:
                        equipment = _a.sent();
                        return [2 /*return*/, response.json(equipment)];
                }
            });
        });
    };
    equipmentController.prototype.indexSerial = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var equipmentSerial, equipment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        equipmentSerial = request.params.equipmentSerial;
                        return [4 /*yield*/, connection_1.default('equipment')
                                .select('equipmentName')
                                .where('localId', equipmentSerial)];
                    case 1:
                        equipment = _a.sent();
                        return [2 /*return*/, response.json(equipment)];
                }
            });
        });
    };
    equipmentController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, equipmentSerialNumber, equipmentName, localId, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, equipmentSerialNumber = _a.equipmentSerialNumber, equipmentName = _a.equipmentName, localId = _a.localId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, connection_1.default('equipment').insert({
                                equipmentSerialNumber: equipmentSerialNumber,
                                equipmentName: equipmentName,
                                localId: localId,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response
                                .status(201)
                                .json({ equipmentSerialNumber: equipmentSerialNumber, equipmentName: equipmentName, localId: localId })];
                    case 3:
                        err_2 = _b.sent();
                        return [2 /*return*/, response.status(404).json(err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    equipmentController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, equipmentSerialNumber, equipmentName, localId, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, equipmentSerialNumber = _a.equipmentSerialNumber, equipmentName = _a.equipmentName, localId = _a.localId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, connection_1.default('equipment')
                                .update('equipmentName', equipmentName)
                                .update('localId', localId)
                                .where('equipmentSerialNumber', '=', equipmentSerialNumber)];
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
    return equipmentController;
}());
exports.default = equipmentController;
