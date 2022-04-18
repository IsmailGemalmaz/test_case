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
const Comment_1 = require("../model/entity/Comment");
const typedi_1 = require("typedi");
const CommentService_1 = require("../service/CommentService");
const UserDecorator_1 = require("../decorator/UserDecorator");
let ArticleController = class ArticleController extends BaseController_1.BaseController {
    add(userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mCommentService.save(userId, comment);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const commentGet = yield this.mCommentService.find();
            return { comment: commentGet };
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentGet = yield this.mCommentService.get(id);
            return { comment: commentGet };
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentGet = yield this.mCommentService.findOne(id);
            return { comment: commentGet };
        });
    }
    update(userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mCommentService.update(userId, comment);
            return { isChanged: true };
        });
    }
    delete(userId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mCommentService.delete(userId, articleId);
            return { isDelete: true };
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(type => CommentService_1.CommentService),
    __metadata("design:type", CommentService_1.CommentService)
], ArticleController.prototype, "mCommentService", void 0);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/add"),
    __param(0, (0, UserDecorator_1.UserId)()),
    __param(1, (0, routing_controllers_1.Body)({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Comment_1.Comment]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "add", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/getAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)("/get"),
    __param(0, (0, routing_controllers_1.QueryParam)("articleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
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
    __metadata("design:paramtypes", [Number, Comment_1.Comment]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Delete)("/delete"),
    __param(0, (0, UserDecorator_1.UserId)()),
    __param(1, (0, routing_controllers_1.QueryParam)("commentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "delete", null);
ArticleController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/comment")
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=CommentController.js.map