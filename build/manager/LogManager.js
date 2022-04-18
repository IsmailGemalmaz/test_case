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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManager = exports.Logger = void 0;
const typedi_1 = require("typedi");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const httpContext = require("express-http-context");
const ProjectSettings_1 = require("../constant/ProjectSettings");
function Logger(fileName) {
    return function (object, propertyName, index) {
        const logger = new LogManager(fileName);
        typedi_1.Container.registerHandler({ object, propertyName, index, value: containerInstance => logger });
    };
}
exports.Logger = Logger;
let LogManager = class LogManager {
    constructor(fileName) {
        this.fileName = fileName;
        this.logFormat = winston.format.combine(winston.format.uncolorize(), winston.format.timestamp(), winston.format.json());
        this.setupLogger();
        this.setupConsoleStream();
    }
    getLogger() {
        return this.logger;
    }
    getHTTPLogger() {
        return this.loggerHTTP;
    }
    setupLogger() {
        if (ProjectSettings_1.ProjectSettings.IS_PROD) {
            const transportError = new DailyRotateFile({
                level: 'error',
                filename: path.join(__dirname, '../../logs/error-%DATE%.log'),
                format: this.logFormat,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '31d',
            });
            const transportCombined = new DailyRotateFile({
                filename: path.join(__dirname, '../../logs/combined-%DATE%.log'),
                format: this.logFormat,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '31d',
            });
            const transportHTTP = new DailyRotateFile({
                format: winston.format.combine(winston.format.uncolorize(), winston.format.printf((info) => {
                    const message = info.message;
                    return message;
                })),
                filename: path.join(__dirname, '../../logs/http-%DATE%.log'),
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '31d',
            });
            this.logger = winston.createLogger({
                level: 'info',
                transports: [transportError, transportCombined],
            });
            this.loggerHTTP = winston.createLogger({
                level: 'http',
                levels: {
                    http: 1,
                },
                transports: [transportHTTP],
            });
        }
        else {
            this.loggerHTTP = winston.createLogger({ level: 'http' });
            this.logger = winston.createLogger({ level: 'info' });
        }
    }
    getOrigin() {
        let origin = this.fileName || 'dev';
        if (this.fileName) {
            origin = origin.replace(process.cwd(), '');
            origin = origin.replace(`${path.sep}src${path.sep}`, '');
            origin = origin.replace(`${path.sep}dist${path.sep}`, '');
            origin = origin.replace(/.(ts)|(js)/, '');
        }
        return origin;
    }
    setupConsoleStream() {
        const settings = {
            format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.align(), winston.format.printf((info) => {
                const { timestamp, level, message } = info, args = __rest(info, ["timestamp", "level", "message"]);
                const ts = timestamp.slice(0, 19).replace('T', ' ');
                return `${ts} | ${level} | ${this.getOrigin()} »: ${message.replace('\t', '')} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
            })),
        };
        this.logger.add(new winston.transports.Console(settings));
        this.loggerHTTP.add(new winston.transports.Console(settings));
    }
    addContext(message) {
        const reqId = httpContext.get('reqId');
        const msgNew = reqId ? 'RequestID: (' + reqId + ') | ' + message : message;
        return msgNew;
    }
    log(level, message) {
        this.getLogger().log(level, this.addContext(message));
    }
    error(message, args) {
        this.getLogger().error(this.addContext(message), args);
    }
    warn(message, args) {
        this.getLogger().warn(this.addContext(message), args);
    }
    verbose(message, args) {
        this.getLogger().verbose(this.addContext(message), args);
    }
    info(message, args) {
        this.getLogger().info(this.addContext(message), args);
    }
    debug(message, args) {
        this.getLogger().debug(this.addContext(message), args);
    }
    silly(message, args) {
        this.getLogger().silly(this.addContext(message), args);
    }
};
LogManager = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [String])
], LogManager);
exports.LogManager = LogManager;
//# sourceMappingURL=LogManager.js.map