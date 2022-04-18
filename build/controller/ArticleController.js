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
exports.ArticleController = void 0;
const routing_controllers_1 = require("routing-controllers");
const BaseController_1 = require("./BaseController");
const Article_1 = require("../model/entity/Article");
const typedi_1 = require("typedi");
const ArticleService_1 = require("../service/ArticleService");
const UserDecorator_1 = require("../decorator/UserDecorator");
let ArticleController = class ArticleController extends BaseController_1.BaseController {
    add(userId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mArticleService.save(userId, article);
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield this.mArticleService.find();
            return { articles: articles };
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.mArticleService.getByIdWithUser(id);
            return { article: article };
        });
    }
    update(userId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mArticleService.update(userId, article);
            return { isChanged: true };
        });
    }
    delete(userId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mArticleService.delete(userId, articleId);
            return { isDelete: true };
        });
    }
    senMailArticle() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mArticleService.sendMailArticle();
            return { isSendMail: true };
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(type => ArticleService_1.ArticleService),
    __metadata("design:type", ArticleService_1.ArticleService)
], ArticleController.prototype, "mArticleService", void 0);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/add"),
    __param(0, (0, UserDecorator_1.UserId)()),
    __param(1, (0, routing_controllers_1.Body)({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Article_1.Article]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "add", null);
__decorate([
    (0, routing_controllers_1.Get)("/getAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "get", null);
__decorate([
    (0, routing_controllers_1.Get)("/getId"),
    __param(0, (0, routing_controllers_1.QueryParam)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getId", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)("/update"),
    __param(0, (0, UserDecorator_1.UserId)()),
    __param(1, (0, routing_controllers_1.Body)({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Article_1.Article]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Delete)("/delete"),
    __param(0, (0, UserDecorator_1.UserId)()),
    __param(1, (0, routing_controllers_1.QueryParam)("articleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "delete", null);
__decorate([
    (0, routing_controllers_1.Post)("/sendMail"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "senMailArticle", null);
ArticleController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/article")
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=ArticleController.js.map