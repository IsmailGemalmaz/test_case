import moment = require("moment-timezone");

export class DateUtil {

    private static readonly DEFAULT_LOCAL_TIMEZONE = "Europe/Istanbul";

    public static getTodayStrForLogFileName(): string {
        return moment().tz(this.DEFAULT_LOCAL_TIMEZONE).format("DD.MM.YYYY");
    }

    public static utcTimestampToLocalString(timestamp: number): string {
        return moment(timestamp).tz(this.DEFAULT_LOCAL_TIMEZONE).format("DD-MM-YYYY HH:mm:ss");
    }

    public static getUtcNow(): any {
        return moment().utc();
    }

    public static getLocalNow(): any {
        return moment().tz(this.DEFAULT_LOCAL_TIMEZONE);
    }

    public static getUtcNowInMs(): number {
        return this.getUtcNow().valueOf();
    }

    public static getLocalNowInMs(): any {
        return moment().tz(this.DEFAULT_LOCAL_TIMEZONE).valueOf();
    }

    public static getUtcNowInSec(): number {
        return this.getUtcNow().unix();
    }

    public static getLocalNowInSec(): any {
        return moment().tz(this.DEFAULT_LOCAL_TIMEZONE).unix();
    }

    public static getUtcNowDate(): Date {
        return this.getUtcNow().toDate();
    }

    public static getLocalNowDate(): Date {
        return this.getLocalNow().toDate();
    }

    public static getLocalNowStr(): string {
        return this.getLocalNow().format("DD-MM-YYYY HH:mm:ss");
    }

    public static getUtcNowStr(): string {
        return this.getUtcNow().format("DD-MM-YYYY HH:mm:ss");
    }
}
