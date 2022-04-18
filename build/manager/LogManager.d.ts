import * as winston from 'winston';
export declare function Logger(fileName: string): (object: any, propertyName: string, index?: number) => void;
export declare class LogManager {
    private fileName;
    private logger;
    private loggerHTTP;
    private logFormat;
    constructor(fileName: string);
    getLogger(): winston.Logger;
    getHTTPLogger(): winston.Logger;
    private setupLogger;
    private getOrigin;
    private setupConsoleStream;
    private addContext;
    log(level: string, message: string): void;
    error(message: string, args?: any): void;
    warn(message: string, args?: any): void;
    verbose(message: string, args?: any): void;
    info(message: string, args?: any): void;
    debug(message: string, args?: any): void;
    silly(message: string, args?: any): void;
}
