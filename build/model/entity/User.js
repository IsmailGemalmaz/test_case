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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("./Article");
const Comment_1 = require("./Comment");
const JwtToken_1 = require("./JwtToken");
const Role_1 = require("./Role");
const DateUtil_1 = require("../../util/DateUtil");
const bcrypt = require("bcrypt");
let User = class User {
    beforeInsertion() {
        return __awaiter(this, void 0, void 0, function* () {
            this.createDate = DateUtil_1.DateUtil.getUtcNowInSec();
            yield this.updatePassword();
        });
    }
    beforeUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updatePassword();
            yield this.updateTempPassword();
        });
    }
    isPasswordCorrect(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.password) {
                return false;
            }
            return yield bcrypt.compare(password, this.password);
        });
    }
    isTempPasswordCorrect(passwordToCompare) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tempPassword) {
                return false;
            }
            return yield bcrypt.compare(passwordToCompare, this.tempPassword);
        });
    }
    updatePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.password) {
                return;
            }
            else {
                try {
                    this.password = yield bcrypt.hash(this.password, 12);
                }
                catch (error) {
                    throw error;
                }
            }
        });
    }
    updateTempPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tempPassword) {
                return;
            }
            else {
                try {
                    this.tempPassword = yield bcrypt.hash(this.tempPassword, 12);
                }
                catch (error) {
                    throw error;
                }
            }
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], User.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "tempPassword", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Role_1.Role, role => role.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Role_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JwtToken_1.JwtToken, token => token.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Article_1.Article, article => article.user),
    __metadata("design:type", Array)
], User.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, comment => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "beforeInsertion", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "beforeUpdate", null);
User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
exports.User = User;
//# sourceMappingURL=User.js.map