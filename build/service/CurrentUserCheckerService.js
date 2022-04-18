"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserCheckerService = void 0;
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const TokenRepository_1 = require("../repository/TokenRepository");
let CurrentUserCheckerService = class CurrentUserCheckerService {
    constructor() {
        this.getCurrentUserFromToken = (action) => __awaiter(this, void 0, void 0, function* () {
            const request = action.request;
            let token = request.headers['authorization'].split(' ')[1];
            if (token == null) {
                throw new routing_controllers_1.UnauthorizedError('Authorization required');
            }
            if (request['token']) {
                token = request['token'];
            }
            const tokenRepository = (0, typeorm_1.getCustomRepository)(TokenRepository_1.TokenRepository);
            const tokenDataWithUser = yield tokenRepository.get(token);
            if (!tokenDataWithUser) {
                throw new routing_controllers_1.ForbiddenError('Can not find user associated with token');
            }
            return tokenDataWithUser.user;
        });
    }
};
CurrentUserCheckerService = __decorate([
    (0, typedi_1.Service)()
], CurrentUserCheckerService);
exports.CurrentUserCheckerService = CurrentUserCheckerService;
//# sourceMappingURL=CurrentUserCheckerService.js.map