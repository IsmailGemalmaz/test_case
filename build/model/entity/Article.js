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
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const DateUtil_1 = require("../../util/DateUtil");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
let Article = class Article {
    beforeInsertion() {
        return __awaiter(this, void 0, void 0, function* () {
            this.createDate = DateUtil_1.DateUtil.getUtcNowInSec();
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Article.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Article.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Article.prototype, "articleName", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Article.prototype, "articleText", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { default: 0 }),
    __metadata("design:type", Boolean)
], Article.prototype, "isSendMail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.article, { onUpdate: "CASCADE", onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Article.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, comment => comment.article),
    __metadata("design:type", Array)
], Article.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Article.prototype, "beforeInsertion", null);
Article = __decorate([
    (0, typeorm_1.Entity)("article")
], Article);
exports.Article = Article;
//# sourceMappingURL=Article.js.map