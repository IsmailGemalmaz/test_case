import { Authorized, Body, Delete, Get, JsonController, Post, Put, QueryParam, } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Article } from "../model/entity/Article";
import { Inject, Service } from "typedi";
import { ArticleService } from "../service/ArticleService";
import { UserId } from '../decorator/UserDecorator';

@Service()
@JsonController("/article")
export class ArticleController extends BaseController {

    @Inject(type => ArticleService)
    private mArticleService: ArticleService;


    @Authorized()
    @Post("/add")
    async add(@UserId() userId: number, @Body({validate: true}) article: Article): Promise<any> {
        return await this.mArticleService.save(userId, article);
    }

    @Get("/getAll")
    async get(): Promise<any> {
        const articles: Article[] = await this.mArticleService.find()
        return {articles: articles}
    }

    @Get("/getId")
    async getId(@QueryParam("id") id: number): Promise<any> {
        const article: Article = await this.mArticleService.getByIdWithUser(id)
        return {article: article}
    }

    @Authorized()
    @Put("/update")
    async update(@UserId() userId: number,@Body({validate: true}) article: Article): Promise<any> {
        await this.mArticleService.update(userId,article)
        return {isChanged: true}
    }

    @Authorized()
    @Delete("/delete")
    async delete(@UserId() userId: number,@QueryParam("articleId") articleId: number): Promise<any> {
        await this.mArticleService.delete(userId,articleId)
        return {isDelete: true}
    }

    
    @Post("/sendMail")
    async senMailArticle(): Promise<any> {
        await this.mArticleService.sendMailArticle()
        return {isSendMail:true}
    }

}