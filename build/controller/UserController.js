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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const BaseController_1 = require("./BaseController");
const User_1 = require("../model/entity/User");
const typedi_1 = require("typedi");
const UserService_1 = require("../service/UserService");
const UserDecorator_1 = require("../decorator/UserDecorator");
const RoleType_1 = require("../constant/RoleType");
let UserController = class UserController extends BaseController_1.BaseController {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mUserService.register(user);
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mUserService.login(email, password);
        });
    }
    refreshToken(previousToken, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mUserService.refreshToken(previousToken, userId);
        });
    }
    changePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mUserService.changePassword(userId, password);
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mUserService.resetPassword(email);
            return { isSend: true };
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.mUserService.find();
            return { user: users };
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(type => UserService_1.UserService),
    __metadata("design:type", UserService_1.UserService)
], UserController.prototype, "mUserService", void 0);
__decorate([
    (0, routing_controllers_1.Post)("/register"),
    __param(0, (0, routing_controllers_1.Body)({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Post)("/login"),
    __param(0, (0, routing_controllers_1.BodyParam)("email")),
    __param(1, (0, routing_controllers_1.BodyParam)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/refreshToken"),
    __param(0, (0, UserDecorator_1.Token)()),
    __param(1, (0, UserDecorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refreshToken", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)("/changePassword"),
    (0, routing_controllers_1.Authorized)(),
    __param(0, (0, UserDecorator_1.UserId)()),
    __param(1, (0, routing_controllers_1.BodyParam)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, routing_controllers_1.Post)("/resetPassword"),
    __param(0, (0, routing_controllers_1.BodyParam)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, routing_controllers_1.Authorized)({ roles: [RoleType_1.RoleType.ADMIN] }),
    (0, routing_controllers_1.Get)("/getAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
UserController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/user")
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map