import {UserService} from "../service/UserService"
import {ProjectSettings} from "../constant/ProjectSettings";
import {Container} from "typedi";
import {ArticleService} from "../service/ArticleService";

var cron = require('node-cron');

export class JobManager {

    private mArticleService: ArticleService;

    constructor() {
        this.mArticleService = Container.get(ArticleService)
        this.sendMailArticle()
    }

    public sendMailArticle() {

        cron.schedule('0 19 *  * *', () => {
            this.mArticleService.sendMailArticle()
        }, {timezone: "Europe/Istanbul"});
    }


}


