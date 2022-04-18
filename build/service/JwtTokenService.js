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
exports.JwtTokenService = void 0;
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const jwt = require("jsonwebtoken");
const httpContext = require("express-http-context");
const JwtToken_1 = require("../model/entity/JwtToken");
const TokenRepository_1 = require("../repository/TokenRepository");
const UserRepository_1 = require("../repository/UserRepository");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ProjectSettings_1 = require("../constant/ProjectSettings");
const DateUtil_1 = require("../util/DateUtil");
const JwtUser_1 = require("../model/entity/JwtUser");
let JwtTokenService = class JwtTokenService {
    createNewTokenAndSave(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtUser = new JwtUser_1.JwtUser();
            jwtUser.id = user.id;
            const token = yield jwt.sign({ jwtUser: jwtUser }, ProjectSettings_1.ProjectSettings.JWT_SECRET_KEY, { expiresIn: ProjectSettings_1.ProjectSettings.JWT_DEFAULT_TIME });
            let jwtToken = yield this.mTokenRepository.getByUserId(user.id);
            if (jwtToken == null) {
                jwtToken = new JwtToken_1.JwtToken();
                jwtToken.agent = httpContext.get("useragent");
                jwtToken.user = user;
            }
            jwtToken.token = token;
            jwtToken.updateDate = DateUtil_1.DateUtil.getUtcNowInSec();
            yield this.mTokenRepository.save(jwtToken);
            yield this.mUserRepository.save(user);
            return token;
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = yield this.decodeToken(token);
            const jwtUser = decoded["jwtUser"];
            const foundUser = yield this.mUserRepository.findOne(jwtUser.id);
            if (foundUser) {
                const newToken = yield this.createNewTokenAndSave(foundUser);
                return newToken;
            }
            else {
                throw new routing_controllers_1.UnauthorizedError("JwtTokenService.UserNotFoundError");
            }
        });
    }
    verifyToken(token) {
        return jwt.verify(token, ProjectSettings_1.ProjectSettings.JWT_SECRET_KEY);
    }
    decodeToken(token) {
        return jwt.decode(token);
    }
};
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(),
    __metadata("design:type", UserRepository_1.UserRepository)
], JwtTokenService.prototype, "mUserRepository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(),
    __metadata("design:type", TokenRepository_1.TokenRepository)
], JwtTokenService.prototype, "mTokenRepository", void 0);
JwtTokenService = __decorate([
    (0, typedi_1.Service)()
], JwtTokenService);
exports.JwtTokenService = JwtTokenService;
//# sourceMappingURL=JwtTokenService.js.map