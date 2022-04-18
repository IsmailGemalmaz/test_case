import { Inject, Service } from "typedi";
import { Comment } from "../model/entity/Comment";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CommentRepository } from "../repository/CommentRepository";
import { CommentResponse } from "../model/response/CommentResponse";
import { Strings } from "../constant/String";
import { BadRequestError } from "routing-controllers";
import { UserService } from './UserService';

@Service()
export class CommentService {

    @InjectRepository(Comment)
    private mCommentRepository: CommentRepository;

    @Inject(() => UserService)
    mUserService: UserService;

    public async findOne(id: number): Promise<Comment> {
        return await this.mCommentRepository.findOne(id);
    }

    public async find(): Promise<Comment[]> {
        return await this.mCommentRepository.find();
    }

    public async save(userId:number,comment: Comment): Promise<any> {
        const user = await this.mUserService.findOne(userId);
        comment.user = user;
        let savedComment: Comment = await this.mCommentRepository.insert(comment);
        delete savedComment.user;
        return new CommentResponse(savedComment)
    }

    public async get(id: number): Promise<any> {
        let getComment: Comment = await this.mCommentRepository.getAllComment(id);
        return new CommentResponse(getComment)
    }

    public async update(userId:number,comment:Comment) {
        let updateComment = await this.mCommentRepository.findOne(comment.id);
        if (updateComment==null || userId != updateComment.userId) {
            throw new BadRequestError(Strings.COMMENT_SERVICE_COMMENT_NOT_FOUND_ERROR);
        } else {
            await this.mCommentRepository.update(comment);
        }
    }

    public async delete(userId:number,id: number) {
        let deleteComment = await this.mCommentRepository.findOne(id);
        if(userId==deleteComment.userId){
            await this.mCommentRepository.delete(id)
        }else{
            throw new BadRequestError(Strings.COMMENT_SERVICE_COMMENT_NOT_FOUND_ERROR);
        }
       
    }

}