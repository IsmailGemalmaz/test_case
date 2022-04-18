import { Authorized, Body, BodyParam, Delete, Get, JsonController, Post, Put, QueryParam, UseBefore, } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Comment } from "../model/entity/Comment";
import { Inject, Service } from "typedi";
import { CommentService } from "../service/CommentService";
import { UserId } from '../decorator/UserDecorator';

@Service()
@JsonController("/comment")
export class ArticleController extends BaseController {

    @Inject(type => CommentService)
    private mCommentService: CommentService;

    @Authorized()
    @Post("/add")
    async add(@UserId() userId:number,@Body({ validate: true }) comment: Comment): Promise<any> {
        return await this.mCommentService.save(userId,comment);
    }

    @Authorized()
    @Get("/getAll")
    async getAll(): Promise<any> {
        const commentGet: Comment[] = await this.mCommentService.find()
        return { comment: commentGet }
    }

    @Get("/get")
    async get(@QueryParam("articleId") id: number): Promise<any> {
        const commentGet: Comment = await this.mCommentService.get(id)
        return { comment: commentGet }
    }

    @Get("/getId")
    async getId(@QueryParam("id") id: number): Promise<any> {
        const commentGet: Comment = await this.mCommentService.findOne(id)
        return { comment: commentGet }
    }

    @Authorized()
    @Put("/update")
    async update( @UserId() userId:number,@Body({ validate: true }) comment: Comment): Promise<any> {
        await this.mCommentService.update(userId,comment)
        return { isChanged: true }
    }

    @Authorized()
    @Delete("/delete")
    async delete( @UserId() userId:number,@QueryParam("commentId") articleId: number): Promise<any> {
        await this.mCommentService.delete(userId,articleId)
        return { isDelete: true }
    }

   

}