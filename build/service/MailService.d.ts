export declare class MailService {
    private transporter;
    private sendPwdReset;
    constructor();
    sendTempPassword(to: string, tempPass: string): Promise<any>;
    sendArticle(to: string[], message: string): Promise<any>;
    private initTransporter;
}
