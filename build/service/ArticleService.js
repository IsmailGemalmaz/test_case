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
exports.ArticleService = void 0;
const typedi_1 = require("typedi");
const Article_1 = require("../model/entity/Article");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ArticleRepository_1 = require("../repository/ArticleRepository");
const ArticleResponse_1 = require("../model/response/ArticleResponse");
const routing_controllers_1 = require("routing-controllers");
const String_1 = require("../constant/String");
const UserService_1 = require("./UserService");
const UserRepository_1 = require("../repository/UserRepository");
const User_1 = require("../model/entity/User");
const MailService_1 = require("./MailService");
let ArticleService = class ArticleService {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mArticleRepository.findOne(id);
        });
    }
    getByIdWithUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mArticleRepository.getByIdWithUser(id);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mArticleRepository.find();
        });
    }
    save(userId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.mUserService.findOne(userId);
            article.user = user;
            let savedArticle = yield this.mArticleRepository.save(article);
            delete savedArticle.user;
            return new ArticleResponse_1.ArticleResponse(savedArticle);
        });
    }
    update(userId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedArticle = yield this.mArticleRepository.findOne(article.id);
            if (savedArticle == null || userId != savedArticle.userId) {
                throw new routing_controllers_1.BadRequestError(String_1.Strings.ARTICLE_SERVICE_ARTICLE_NOT_FOUND_ERROR);
            }
            else {
                yield this.mArticleRepository.save(article);
                return savedArticle;
            }
        });
    }
    delete(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleteArticle = yield this.mArticleRepository.findOne(id);
            if (userId == deleteArticle.userId) {
                yield this.mArticleRepository.delete(id);
            }
        });
    }
    sendMailArticle() {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield this.mArticleRepository.willSendMails();
            const users = yield this.mUserRepository.find();
            const emails = [];
            const articleNames = [];
            yield users.find((user) => {
                emails.push(user.email);
            });
            yield articles.find((article) => {
                article.isSendMail = true;
                articleNames.push(article.articleName);
            });
            if (articleNames.length !== 0) {
                const message = String_1.Strings.ARTICLE_SERVICE_DAILY_ARTICLES + articleNames;
                this.mMailService.sendArticle(emails, message);
            }
            yield this.mArticleRepository.save(articles);
        });
    }
};
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Article_1.Article),
    __metadata("design:type", ArticleRepository_1.ArticleRepository)
], ArticleService.prototype, "mArticleRepository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", UserRepository_1.UserRepository)
], ArticleService.prototype, "mUserRepository", void 0);
__decorate([
    (0, typedi_1.Inject)(() => UserService_1.UserService),
    __metadata("design:type", UserService_1.UserService)
], ArticleService.prototype, "mUserService", void 0);
__decorate([
    (0, typedi_1.Inject)(() => MailService_1.MailService),
    __metadata("design:type", MailService_1.MailService)
], ArticleService.prototype, "mMailService", void 0);
ArticleService = __decorate([
    (0, typedi_1.Service)()
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=ArticleService.js.map