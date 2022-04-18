import { Article } from "../model/entity/Article";
import { UserService } from './UserService';
export declare class ArticleService {
    private mArticleRepository;
    private mUserRepository;
    mUserService: UserService;
    private mMailService;
    findOne(id: number): Promise<Article>;
    getByIdWithUser(id: number): Promise<Article>;
    find(): Promise<Article[]>;
    save(userId: number, article: Article): Promise<any>;
    update(userId: number, article: Article): Promise<Article>;
    delete(userId: number, id: number): Promise<void>;
    sendMailArticle(): Promise<void>;
}
