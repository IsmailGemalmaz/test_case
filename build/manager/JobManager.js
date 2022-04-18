"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobManager = void 0;
const typedi_1 = require("typedi");
const ArticleService_1 = require("../service/ArticleService");
var cron = require('node-cron');
class JobManager {
    constructor() {
        this.mArticleService = typedi_1.Container.get(ArticleService_1.ArticleService);
        this.sendMailArticle();
    }
    sendMailArticle() {
        cron.schedule('0 19 *  * *', () => {
            this.mArticleService.sendMailArticle();
        }, { timezone: "Europe/Istanbul" });
    }
}
exports.JobManager = JobManager;
//# sourceMappingURL=JobManager.js.map