import { Repository } from "typeorm";
import { Comment } from "../model/entity/Comment";
export declare class CommentRepository extends Repository<Comment> {
    insert(comment: Comment): Promise<any>;
    update(comment: Comment): Promise<any>;
    getAllComment(id: number): Promise<any>;
}
