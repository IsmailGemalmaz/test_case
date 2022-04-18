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
exports.UserService = void 0;
const typedi_1 = require("typedi");
const User_1 = require("../model/entity/User");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const UserRepository_1 = require("../repository/UserRepository");
const JwtTokenService_1 = require("./JwtTokenService");
const UserResponse_1 = require("../model/response/UserResponse");
const routing_controllers_1 = require("routing-controllers");
const MailService_1 = require("./MailService");
const RoleService_1 = require("./RoleService");
const passwordGenerator = require("generate-password");
let UserService = class UserService {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mUserRepository.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mUserRepository.findOne(id);
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEmailExist = yield this.mUserRepository.isEmailExists(user.email);
            if (isEmailExist == false) {
                let savedUser = yield this.mUserRepository.save(user);
                yield this.mRoleService.save(savedUser);
                const token = yield this.mJwtTokenService.createNewTokenAndSave(user);
                return new UserResponse_1.UserResponse(savedUser, token);
            }
            else {
                new routing_controllers_1.BadRequestError("Email Exist.");
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.mUserRepository.getForLogin(email);
            if (user) {
                const isPasswordCorrect = yield user.isPasswordCorrect(password);
                const isTempPasswordCorrect = yield user.isTempPasswordCorrect(password);
                if (isPasswordCorrect || isTempPasswordCorrect) {
                    const token = yield this.mJwtTokenService.createNewTokenAndSave(user);
                    return new UserResponse_1.UserResponse(user, token, isTempPasswordCorrect);
                }
                else {
                    throw new routing_controllers_1.BadRequestError("AuthServiceLoginWrongPasswordError");
                }
            }
            else {
                throw new routing_controllers_1.BadRequestError("AuthServiceLoginUserNotFoundError");
            }
        });
    }
    refreshToken(previousToken, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.mUserRepository.findOne(userId);
            if (user) {
                const token = yield this.mJwtTokenService.refreshToken(previousToken);
                return new UserResponse_1.UserResponse(user, token);
            }
            else {
                throw new routing_controllers_1.UnauthorizedError("AuthCheckerServiceUserNotLongerExistsError");
            }
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.mUserRepository.getByEmailForResetPassword(email);
            if (user == null) {
                throw new routing_controllers_1.BadRequestError("User not found.");
            }
            else {
                const generatedPassword = passwordGenerator.generate({
                    length: 6,
                    numbers: true,
                }).toUpperCase();
                yield this.mMailService.sendTempPassword(user.email, generatedPassword);
                user.tempPassword = generatedPassword;
                yield this.mUserRepository.save(user);
            }
        });
    }
    changePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (password == null) {
                throw new routing_controllers_1.BadRequestError("Please enter password");
            }
            else {
                const user = yield this.mUserRepository.findOne(id);
                if (!user) {
                    throw new routing_controllers_1.BadRequestError("User not found/");
                }
                else {
                    user.password = password;
                    user.tempPassword = null;
                    yield this.mUserRepository.save(user);
                    return { isChanged: true };
                }
            }
        });
    }
};
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", UserRepository_1.UserRepository)
], UserService.prototype, "mUserRepository", void 0);
__decorate([
    (0, typedi_1.Inject)(() => JwtTokenService_1.JwtTokenService),
    __metadata("design:type", JwtTokenService_1.JwtTokenService)
], UserService.prototype, "mJwtTokenService", void 0);
__decorate([
    (0, typedi_1.Inject)(() => RoleService_1.RoleService),
    __metadata("design:type", RoleService_1.RoleService)
], UserService.prototype, "mRoleService", void 0);
__decorate([
    (0, typedi_1.Inject)(() => MailService_1.MailService),
    __metadata("design:type", MailService_1.MailService)
], UserService.prototype, "mMailService", void 0);
UserService = __decorate([
    (0, typedi_1.Service)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map