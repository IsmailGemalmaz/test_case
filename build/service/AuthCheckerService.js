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
exports.AuthCheckerService = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const RoleType_1 = require("../constant/RoleType");
const JwtTokenService_1 = require("./JwtTokenService");
const jwt = require("jsonwebtoken");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const RoleService_1 = require("./RoleService");
const UserRepository_1 = require("../repository/UserRepository");
let AuthCheckerService = class AuthCheckerService {
    constructor() {
        this.checkToken = (action, roles) => __awaiter(this, void 0, void 0, function* () {
            const request = action.request;
            const jwtUser = this.parseToken(request);
            const foundUser = yield this.mUserRepository.findOne({ id: jwtUser.id });
            if (foundUser) {
                const role = roles[0];
                let requiredRoleTypes = null;
                if (roles && roles.length) {
                    requiredRoleTypes = roles;
                }
                else {
                    requiredRoleTypes = role && role.roles ? role.roles : [RoleType_1.DEFAULT_ROLE_TYPE];
                }
                const userRole = yield this.mRoleService.getByUserId(jwtUser.id);
                if (userRole) {
                    const userRoleType = userRole.type;
                    const matchedRoles = requiredRoleTypes.filter((requiredRoleType) => (0, RoleType_1.getRoleTypeWeight)(userRoleType) >= (0, RoleType_1.getRoleTypeWeight)(requiredRoleType));
                    return matchedRoles.length > 0;
                }
                else {
                    throw new routing_controllers_1.UnauthorizedError("AuthCheckerServiceUserRoleNotFoundError");
                }
            }
            else {
                throw new routing_controllers_1.UnauthorizedError("AuthCheckerServiceUserNotFoundError");
            }
        });
    }
    parseToken(request) {
        const token = request.get("authorization");
        if (token) {
            try {
                const jwtToken = this.mJwtTokenService.verifyToken(token);
                const jwtUser = jwtToken["jwtUser"];
                if (jwtUser) {
                    return jwtUser;
                }
                else {
                    throw new routing_controllers_1.UnauthorizedError("AuthCheckerServiceInvalidTokenDataError");
                }
            }
            catch (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    throw new routing_controllers_1.UnauthorizedError("AuthCheckerServiceTokenExpiredError");
                }
                else {
                    throw new routing_controllers_1.UnauthorizedError("AuthCheckerServiceInvalidTokenError");
                }
            }
        }
        else {
            throw new routing_controllers_1.UnauthorizedError("AuthCheckerServiceAuthRequiredError");
        }
    }
};
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(),
    __metadata("design:type", UserRepository_1.UserRepository)
], AuthCheckerService.prototype, "mUserRepository", void 0);
__decorate([
    (0, typedi_1.Inject)(() => RoleService_1.RoleService),
    __metadata("design:type", RoleService_1.RoleService)
], AuthCheckerService.prototype, "mRoleService", void 0);
__decorate([
    (0, typedi_1.Inject)(() => JwtTokenService_1.JwtTokenService),
    __metadata("design:type", JwtTokenService_1.JwtTokenService)
], AuthCheckerService.prototype, "mJwtTokenService", void 0);
AuthCheckerService = __decorate([
    (0, typedi_1.Service)()
], AuthCheckerService);
exports.AuthCheckerService = AuthCheckerService;
//# sourceMappingURL=AuthCheckerService.js.map