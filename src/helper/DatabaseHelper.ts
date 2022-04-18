import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Container, Service } from 'typedi';
import { ProjectSettings } from "../constant/ProjectSettings";
import { LogManager } from '../manager/LogManager';

export class DatabaseHelper{
    private mConnection: Connection;
    private mLogger: LogManager;
    constructor(){
        this.mLogger = Container.get(LogManager);
    }

    public async connect(): Promise<boolean> {
        try {
            this.mLogger.info("Connecting to database: " + ProjectSettings.getDatabaseHost() + ":" + ProjectSettings.getDatabasePort());
            const connectionOptions: ConnectionOptions = this.prepareConnectionOptions();
            this.mConnection = await createConnection(connectionOptions);
            if (this.mConnection) {
               this.mLogger.info('Connected to database successfully');
                if (ProjectSettings.DATABASE_DROP_ENABLED) {
                    this.drop();
                }
                return true;
            }
        } catch (error) {
            this.mLogger.error('Could not connect to the database, reason:' + error);
            return false;
        }
    }

    public async close() {
        await this.mConnection.close();
    }

    private prepareConnectionOptions(): ConnectionOptions {
        const type: any = ProjectSettings.DATABASE_TYPE;
        const options = {
            type: type,
            host: ProjectSettings.getDatabaseHost(),
            port: ProjectSettings.getDatabasePort(),
            username: ProjectSettings.getDatabaseUser(),
            password: ProjectSettings.getDatabasePassword(),
            database: ProjectSettings.getDatabaseName(),
            entities: [__dirname+ '/../model/entity/*{.ts,.js}'],
            synchronize: ProjectSettings.DATABASE_SYNC_ENABLED,
            charset: "utf8mb4",
            collation: "utf8mb4_general_ci",
            autoSchemaSync: true,
            logging: false,
            cache: false,
        };
        return options;
    }

    private drop() {
        this.mLogger.info("Database dropping");
        this.mConnection.dropDatabase();
    }

}