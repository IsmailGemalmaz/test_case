import { EntityRepository, Repository ,getRepository} from "typeorm";
import { Service } from "typedi";
import { Article } from "../model/entity/Article";

@Service()
@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    public async getByIdWithUser(id: number): Promise<Article> {
        return await this.createQueryBuilder("article")
                         .leftJoinAndSelect("article.user", "user")
                         .where("article.id=:id", {id: id})
                         .getOne();
    }

    public async willSendMails(): Promise<Article[]> {
        return await this.createQueryBuilder("article")
        .where("article.isSendMail=0")
        .getMany();           
    }

    public async getArticle(): Promise<Article[]> {
        return await this.createQueryBuilder("article")
                         .select(["article.isSendMail"])
                         .getMany();
    }

}