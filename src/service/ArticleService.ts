import { Inject, Service } from "typedi";
import { Article } from "../model/entity/Article";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ArticleRepository } from "../repository/ArticleRepository";
import { ArticleResponse } from "../model/response/ArticleResponse";
import { BadRequestError } from "routing-controllers";
import { Strings } from "../constant/String";
import { UserService } from './UserService';
import { UserRepository } from "../repository/UserRepository";
import { User } from "../model/entity/User";
import { MailService } from "./MailService";

@Service()
export class ArticleService {

    @InjectRepository(Article)
    private mArticleRepository: ArticleRepository;

    @InjectRepository(User)
    private mUserRepository: UserRepository;

    @Inject(() => UserService)
    mUserService: UserService;

    @Inject(() => MailService)
    private mMailService: MailService;

    public async findOne(id: number): Promise<Article> {
        return await this.mArticleRepository.findOne(id);
    }

    public async getByIdWithUser(id: number): Promise<Article> {
        return await this.mArticleRepository.getByIdWithUser(id);
    }

    public async find(): Promise<Article[]> {
        return await this.mArticleRepository.find();
    }

    public async save(userId: number, article: Article): Promise<any> {
        const user = await this.mUserService.findOne(userId);
        article.user = user;
        let savedArticle: Article = await this.mArticleRepository.save(article);
        delete savedArticle.user;
        return new ArticleResponse(savedArticle)
    }

    public async update( userId:number,article: Article) {
        let savedArticle = await this.mArticleRepository.findOne(article.id);   
        if (savedArticle == null || userId !=savedArticle.userId) {
            throw new BadRequestError(Strings.ARTICLE_SERVICE_ARTICLE_NOT_FOUND_ERROR);
        } else {
            await this.mArticleRepository.save(article)
            return savedArticle;
        }
    }

    public async delete(userId:number,id: number) {
        let deleteArticle = await this.mArticleRepository.findOne(id);
        if(userId==deleteArticle.userId){
             await this.mArticleRepository.delete(id)
        }
    }

    public async sendMailArticle() {
        const articles: Article[] = await this.mArticleRepository.willSendMails();
        const users: any = await this.mUserRepository.find();
        const emails: string[] = [];
        const articleNames: string[] = [];
        await users.find((user: { email: string }) => {
            emails.push(user.email)
        });
        await articles.find((article) => {
            article.isSendMail = true;
            articleNames.push(article.articleName)
        });
        if (articleNames.length !== 0) {
            const message = Strings.ARTICLE_SERVICE_DAILY_ARTICLES +  articleNames
            this.mMailService.sendArticle(emails, message)
        }
        await this.mArticleRepository.save(articles);
    }

}

/*
public async sendMailArticle(){
    const getArticle:any=await this.mArticleRepository.find()
    const getUser:any=await this.mUserRepository.find()
    const mail:User=await  this.mUserRepository.getEmail()
    const article=await  this.mArticleRepository.getArticle()
    getUser.find( (user:{email:string})=>{
        console.log(user.email)
    })
    console.log(mail)
    console.log(article)
    getArticle.find( (article:{id:number,isSendMail:boolean,articleName:string})=>{
        if(article.isSendMail==false){
            article.isSendMail=true
            var updateArticle={id:article.id,isSendMail:true}
            this.mArticleRepository.save(updateArticle)
            console.log(article.articleName)

            this.mMailService.sendArticle(,article.articleName)
        }
    })
  */