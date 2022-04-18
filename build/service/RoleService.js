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
exports.RoleService = void 0;
const typedi_1 = require("typedi");
const Role_1 = require("../model/entity/Role");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const RoleRepository_1 = require("../repository/RoleRepository");
const RoleType_1 = require("../constant/RoleType");
let RoleService = class RoleService {
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mRoleRepository.getByUserId(userId);
        });
    }
    save(user, roleType = RoleType_1.RoleType.USER) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = new Role_1.Role();
            role.type = roleType;
            role.user = user;
            const savedRole = yield this.mRoleRepository.save(role);
            savedRole.user = undefined;
            return savedRole;
        });
    }
    update(role) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mRoleRepository.save(role);
        });
    }
};
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(),
    __metadata("design:type", RoleRepository_1.RoleRepository)
], RoleService.prototype, "mRoleRepository", void 0);
RoleService = __decorate([
    (0, typedi_1.Service)()
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=RoleService.js.map