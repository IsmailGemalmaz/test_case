"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSettings = void 0;
class ProjectSettings {
    static getDatabaseHost() {
        return this.IS_PROD ? this.DATABASE_HOST_PROD : this.DATABASE_HOST_DEV;
    }
    static getDatabasePort() {
        return this.IS_PROD ? this.DATABASE_PORT_PROD : this.DATABASE_PORT_DEV;
    }
    static getDatabaseName() {
        return this.IS_PROD ? this.DATABASE_NAME_PROD : this.DATABASE_NAME_DEV;
    }
    static getDatabaseUser() {
        return this.IS_PROD ? this.DATABASE_USER_PROD : this.DATABASE_USER_DEV;
    }
    static getDatabasePassword() {
        return this.IS_PROD ? this.DATABASE_PASSWORD_PROD : this.DATABASE_PASSWORD_DEV;
    }
}
exports.ProjectSettings = ProjectSettings;
ProjectSettings.IS_PROD = true;
ProjectSettings.DATABASE_TYPE = "mysql";
ProjectSettings.DATABASE_SYNC_ENABLED = true;
ProjectSettings.DATABASE_DROP_ENABLED = false;
ProjectSettings.IS_CRON_SERVER = true;
ProjectSettings.DATABASE_HOST_PROD = "localHost";
ProjectSettings.DATABASE_PORT_PROD = 3306;
ProjectSettings.DATABASE_NAME_PROD = "test_case";
ProjectSettings.DATABASE_USER_PROD = "toor";
ProjectSettings.DATABASE_PASSWORD_PROD = "toor123";
ProjectSettings.DATABASE_HOST_DEV = "localhost";
ProjectSettings.DATABASE_PORT_DEV = 3306;
ProjectSettings.DATABASE_NAME_DEV = "test_case";
ProjectSettings.DATABASE_USER_DEV = "toor";
ProjectSettings.DATABASE_PASSWORD_DEV = "toor123";
ProjectSettings.ROUTE_PREFIX = "/api/v1";
ProjectSettings.JWT_SECRET_KEY = "U29L43M4FQ762AP";
ProjectSettings.JWT_DEFAULT_TIME = "1d";
ProjectSettings.MAIL_SERVICE_EMAIL = "test.test5734@gmail.com";
ProjectSettings.MAIL_SERVICE_PASSWORD = "123456789!'";
//# sourceMappingURL=ProjectSettings.js.map