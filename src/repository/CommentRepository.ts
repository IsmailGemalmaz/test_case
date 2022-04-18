import { EntityRepository, getRepository, Repository } from "typeorm";
import { Service } from "typedi";
import { Comment } from "../model/entity/Comment";

@Service()
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> { 

    public async insert(comment: Comment): Promise<any> {
        return await super.save(comment)
    }

    public async update(comment:Comment): Promise<any> {
        return await super.save(comment)
    }
   

    
    public async getAllComment(id:number): Promise<any> {
        return await getRepository(Comment)
        .createQueryBuilder("comment")
        .where("comment.articleId=:articleId",{articleId:id})
        .getMany()           
    }
}