import { Comment } from "../model/entity/Comment";
import { UserService } from './UserService';
export declare class CommentService {
    private mCommentRepository;
    mUserService: UserService;
    findOne(id: number): Promise<Comment>;
    find(): Promise<Comment[]>;
    save(userId: number, comment: Comment): Promise<any>;
    get(id: number): Promise<any>;
    update(userId: number, comment: Comment): Promise<void>;
    delete(userId: number, id: number): Promise<void>;
}
