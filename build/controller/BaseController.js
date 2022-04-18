"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const LogManager_1 = require("../manager/LogManager");
let BaseController = class BaseController {
};
__decorate([
    (0, LogManager_1.Logger)(__filename),
    __metadata("design:type", LogManager_1.LogManager)
], BaseController.prototype, "logger", void 0);
BaseController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)()
], BaseController);
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map