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
exports.CommentService = void 0;
const typedi_1 = require("typedi");
const Comment_1 = require("../model/entity/Comment");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const CommentRepository_1 = require("../repository/CommentRepository");
const CommentResponse_1 = require("../model/response/CommentResponse");
const String_1 = require("../constant/String");
const routing_controllers_1 = require("routing-controllers");
const UserService_1 = require("./UserService");
let CommentService = class CommentService {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mCommentRepository.findOne(id);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mCommentRepository.find();
        });
    }
    save(userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.mUserService.findOne(userId);
            comment.user = user;
            let savedComment = yield this.mCommentRepository.insert(comment);
            delete savedComment.user;
            return new CommentResponse_1.CommentResponse(savedComment);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let getComment = yield this.mCommentRepository.getAllComment(id);
            return new CommentResponse_1.CommentResponse(getComment);
        });
    }
    update(userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateComment = yield this.mCommentRepository.findOne(comment.id);
            if (updateComment == null || userId != updateComment.userId) {
                throw new routing_controllers_1.BadRequestError(String_1.Strings.COMMENT_SERVICE_COMMENT_NOT_FOUND_ERROR);
            }
            else {
                yield this.mCommentRepository.update(comment);
            }
        });
    }
    delete(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleteComment = yield this.mCommentRepository.findOne(id);
            if (userId == deleteComment.userId) {
                yield this.mCommentRepository.delete(id);
            }
            else {
                throw new routing_controllers_1.BadRequestError(String_1.Strings.COMMENT_SERVICE_COMMENT_NOT_FOUND_ERROR);
            }
        });
    }
};
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Comment_1.Comment),
    __metadata("design:type", CommentRepository_1.CommentRepository)
], CommentService.prototype, "mCommentRepository", void 0);
__decorate([
    (0, typedi_1.Inject)(() => UserService_1.UserService),
    __metadata("design:type", UserService_1.UserService)
], CommentService.prototype, "mUserService", void 0);
CommentService = __decorate([
    (0, typedi_1.Service)()
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=CommentService.js.map