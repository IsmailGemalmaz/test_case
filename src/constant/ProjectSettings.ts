export abstract class ProjectSettings {
    public static readonly IS_PROD = true;

    public static readonly DATABASE_TYPE = "mysql";
    public static readonly DATABASE_SYNC_ENABLED = true;
    public static readonly DATABASE_DROP_ENABLED = false;
    public static readonly IS_CRON_SERVER = true;

    public static readonly DATABASE_HOST_PROD = "localHost";
    public static readonly DATABASE_PORT_PROD = 3306;
    public static readonly DATABASE_NAME_PROD = "test_case";
    public static readonly DATABASE_USER_PROD = "toor";
    public static readonly DATABASE_PASSWORD_PROD = "toor123";

    public static readonly DATABASE_HOST_DEV = "localhost";
    public static readonly DATABASE_PORT_DEV = 3306;
    public static readonly DATABASE_NAME_DEV = "test_case";
    public static readonly DATABASE_USER_DEV = "toor";
    public static readonly DATABASE_PASSWORD_DEV = "toor123";

    public static readonly ROUTE_PREFIX = "/api/v1";

    //JWT
    public static readonly JWT_SECRET_KEY = "U29L43M4FQ762AP";
    public static readonly JWT_DEFAULT_TIME = "1d";

    //MAIL
    public static readonly MAIL_SERVICE_EMAIL = "test.test5734@gmail.com";
    public static readonly MAIL_SERVICE_PASSWORD = "123456789!'";

    public static getDatabaseHost(): string {
        return this.IS_PROD ? this.DATABASE_HOST_PROD : this.DATABASE_HOST_DEV;
    }

    public static getDatabasePort(): number {
        return this.IS_PROD ? this.DATABASE_PORT_PROD : this.DATABASE_PORT_DEV;
    }

    public static getDatabaseName(): string {
        return this.IS_PROD ? this.DATABASE_NAME_PROD : this.DATABASE_NAME_DEV;
    }

    public static getDatabaseUser(): string {
        return this.IS_PROD ? this.DATABASE_USER_PROD : this.DATABASE_USER_DEV;
    }

    public static getDatabasePassword(): string {
        return this.IS_PROD ? this.DATABASE_PASSWORD_PROD : this.DATABASE_PASSWORD_DEV;
    }

}