import { User } from "./User";
import { Comment } from "./Comment";
export declare class Article {
    id: number;
    createDate: number;
    userId: number;
    articleName: string;
    articleText: string;
    isSendMail: boolean;
    user: User;
    comment: Comment[];
    beforeInsertion(): Promise<void>;
}
