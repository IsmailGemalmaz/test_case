import { Article } from "./Article";
import { User } from "./User";
export declare class Comment {
    id: number;
    userId: number;
    createDate: number;
    articleId: number;
    comment: string;
    article: Article;
    user: User;
    beforeInsertion(): Promise<void>;
}
