import { BaseController } from "./BaseController";
import { Article } from "../model/entity/Article";
export declare class ArticleController extends BaseController {
    private mArticleService;
    add(userId: number, article: Article): Promise<any>;
    get(): Promise<any>;
    getId(id: number): Promise<any>;
    update(userId: number, article: Article): Promise<any>;
    delete(userId: number, articleId: number): Promise<any>;
    senMailArticle(): Promise<any>;
}
