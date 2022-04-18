import { Service } from "typedi";
import * as nodemailer from "nodemailer";
import { ProjectSettings } from "../constant/ProjectSettings";
import { User } from "../model/entity/User";

@Service()
export class MailService {
    private transporter: nodemailer.Transporter;
    private sendPwdReset: nodemailer.Transporter;

    constructor() {
        this.initTransporter();
    }

    public async sendTempPassword(to: string, tempPass: string): Promise<any> {
        const mailOptions: nodemailer.SendMailOptions = {
            from: "TestCase <test.test5734@gmail.com>",
            to,
            subject: "Password reset for test_case ✔", 
            text: "Your temp password: " + tempPass,
        };
        await this.transporter
                  .sendMail(mailOptions)                        
                  .then((info:any) => {
                      return info.messageId;
                  });
    }

    public async sendArticle(to: string[], message:string): Promise<any> {
        const mailOptions: nodemailer.SendMailOptions = {
            from: "TestCase <test.test5734@gmail.com>",
            to,
            subject: " Today's articlies  ✔",
            text:message
        };
        await this.transporter
                  .sendMail(mailOptions)                        
                  .then((info:any) => {
                      return info.messageId;
                  });
    }

    private initTransporter() {
        this.transporter = nodemailer.createTransport({
            service: "google",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: ProjectSettings.MAIL_SERVICE_EMAIL,
                pass: ProjectSettings.MAIL_SERVICE_PASSWORD
            },
        });
    }
}
