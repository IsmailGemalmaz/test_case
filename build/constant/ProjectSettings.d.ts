export declare abstract class ProjectSettings {
    static readonly IS_PROD = true;
    static readonly DATABASE_TYPE = "mysql";
    static readonly DATABASE_SYNC_ENABLED = true;
    static readonly DATABASE_DROP_ENABLED = false;
    static readonly IS_CRON_SERVER = true;
    static readonly DATABASE_HOST_PROD = "localHost";
    static readonly DATABASE_PORT_PROD = 3306;
    static readonly DATABASE_NAME_PROD = "test_case";
    static readonly DATABASE_USER_PROD = "toor";
    static readonly DATABASE_PASSWORD_PROD = "toor123";
    static readonly DATABASE_HOST_DEV = "localhost";
    static readonly DATABASE_PORT_DEV = 3306;
    static readonly DATABASE_NAME_DEV = "test_case";
    static readonly DATABASE_USER_DEV = "toor";
    static readonly DATABASE_PASSWORD_DEV = "toor123";
    static readonly ROUTE_PREFIX = "/api/v1";
    static readonly JWT_SECRET_KEY = "U29L43M4FQ762AP";
    static readonly JWT_DEFAULT_TIME = "1d";
    static readonly MAIL_SERVICE_EMAIL = "test.test5734@gmail.com";
    static readonly MAIL_SERVICE_PASSWORD = "123456789!'";
    static getDatabaseHost(): string;
    static getDatabasePort(): number;
    static getDatabaseName(): string;
    static getDatabaseUser(): string;
    static getDatabasePassword(): string;
}
