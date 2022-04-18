"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const moment = require("moment-timezone");
class DateUtil {
    static getTodayStrForLogFileName() {
        return moment().tz(this.DEFAULT_LOCAL_TIMEZONE).format("DD.MM.YYYY");
    }
    static utcTimestampToLocalString(timestamp) {
        return moment(timestamp).tz(this.DEFAULT_LOCAL_TIMEZONE).format("DD-MM-YYYY HH:mm:ss");
    }
    static getUtcNow() {
        return moment().utc();
    }
    static getLocalNow() {
        return moment().tz(this.DEFAULT_LOCAL_TIMEZONE);
    }
    static getUtcNowInMs() {
        return this.getUtcNow().valueOf();
    }
    static getLocalNowInMs() {
        return moment().tz(this.DEFAULT_LOCAL_TIMEZONE).valueOf();
    }
    static getUtcNowInSec() {
        return this.getUtcNow().unix();
    }
    static getLocalNowInSec() {
        return moment().tz(this.DEFAULT_LOCAL_TIMEZONE).unix();
    }
    static getUtcNowDate() {
        return this.getUtcNow().toDate();
    }
    static getLocalNowDate() {
        return this.getLocalNow().toDate();
    }
    static getLocalNowStr() {
        return this.getLocalNow().format("DD-MM-YYYY HH:mm:ss");
    }
    static getUtcNowStr() {
        return this.getUtcNow().format("DD-MM-YYYY HH:mm:ss");
    }
}
exports.DateUtil = DateUtil;
DateUtil.DEFAULT_LOCAL_TIMEZONE = "Europe/Istanbul";
//# sourceMappingURL=DateUtil.js.map