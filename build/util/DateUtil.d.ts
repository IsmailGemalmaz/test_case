export declare class DateUtil {
    private static readonly DEFAULT_LOCAL_TIMEZONE;
    static getTodayStrForLogFileName(): string;
    static utcTimestampToLocalString(timestamp: number): string;
    static getUtcNow(): any;
    static getLocalNow(): any;
    static getUtcNowInMs(): number;
    static getLocalNowInMs(): any;
    static getUtcNowInSec(): number;
    static getLocalNowInSec(): any;
    static getUtcNowDate(): Date;
    static getLocalNowDate(): Date;
    static getLocalNowStr(): string;
    static getUtcNowStr(): string;
}
