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
exports.ArticleRepository = void 0;
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const Article_1 = require("../model/entity/Article");
let ArticleRepository = class ArticleRepository extends typeorm_1.Repository {
    getByIdWithUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder("article")
                .leftJoinAndSelect("article.user", "user")
                .where("article.id=:id", { id: id })
                .getOne();
        });
    }
    willSendMails() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder("article")
                .where("article.isSendMail=0")
                .getMany();
        });
    }
    getArticle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createQueryBuilder("article")
                .select(["article.isSendMail"])
                .getMany();
        });
    }
};
ArticleRepository = __decorate([
    (0, typedi_1.Service)(),
    (0, typeorm_1.EntityRepository)(Article_1.Article)
], ArticleRepository);
exports.ArticleRepository = ArticleRepository;
//# sourceMappingURL=ArticleRepository.js.map