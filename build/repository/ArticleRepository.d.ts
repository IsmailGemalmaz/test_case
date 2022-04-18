import { Repository } from "typeorm";
import { Article } from "../model/entity/Article";
export declare class ArticleRepository extends Repository<Article> {
    getByIdWithUser(id: number): Promise<Article>;
    willSendMails(): Promise<Article[]>;
    getArticle(): Promise<Article[]>;
}
