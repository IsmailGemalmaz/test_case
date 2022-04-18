"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const typedi_1 = require("typedi");
const nodemailer = require("nodemailer");
const ProjectSettings_1 = require("../constant/ProjectSettings");
let MailService = class MailService {
    constructor() {
        this.initTransporter();
    }
    sendTempPassword(to, tempPass) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: "TestCase <test.test5734@gmail.com>",
                to,
                subject: "Password reset for test_case ✔",
                text: "Your temp password: " + tempPass,
            };
            yield this.transporter
                .sendMail(mailOptions)
                .then((info) => {
                return info.messageId;
            });
        });
    }
    sendArticle(to, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: "TestCase <test.test5734@gmail.com>",
                to,
                subject: " Today's articlies  ✔",
                text: message
            };
            yield this.transporter
                .sendMail(mailOptions)
                .then((info) => {
                return info.messageId;
            });
        });
    }
    initTransporter() {
        this.transporter = nodemailer.createTransport({
            service: "google",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: ProjectSettings_1.ProjectSettings.MAIL_SERVICE_EMAIL,
                pass: ProjectSettings_1.ProjectSettings.MAIL_SERVICE_PASSWORD
            },
        });
    }
};
MailService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=MailService.js.map