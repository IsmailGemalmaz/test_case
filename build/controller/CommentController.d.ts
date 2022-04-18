import { BaseController } from "./BaseController";
import { Comment } from "../model/entity/Comment";
export declare class ArticleController extends BaseController {
    private mCommentService;
    add(userId: number, comment: Comment): Promise<any>;
    getAll(): Promise<any>;
    get(id: number): Promise<any>;
    getId(id: number): Promise<any>;
    update(userId: number, comment: Comment): Promise<any>;
    delete(userId: number, articleId: number): Promise<any>;
}
