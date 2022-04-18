"use strict";
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
exports.DatabaseHelper = void 0;
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const ProjectSettings_1 = require("../constant/ProjectSettings");
const LogManager_1 = require("../manager/LogManager");
class DatabaseHelper {
    constructor() {
        this.mLogger = typedi_1.Container.get(LogManager_1.LogManager);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.mLogger.info("Connecting to database: " + ProjectSettings_1.ProjectSettings.getDatabaseHost() + ":" + ProjectSettings_1.ProjectSettings.getDatabasePort());
                const connectionOptions = this.prepareConnectionOptions();
                this.mConnection = yield (0, typeorm_1.createConnection)(connectionOptions);
                if (this.mConnection) {
                    this.mLogger.info('Connected to database successfully');
                    if (ProjectSettings_1.ProjectSettings.DATABASE_DROP_ENABLED) {
                        this.drop();
                    }
                    return true;
                }
            }
            catch (error) {
                this.mLogger.error('Could not connect to the database, reason:' + error);
                return false;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mConnection.close();
        });
    }
    prepareConnectionOptions() {
        const type = ProjectSettings_1.ProjectSettings.DATABASE_TYPE;
        const options = {
            type: type,
            host: ProjectSettings_1.ProjectSettings.getDatabaseHost(),
            port: ProjectSettings_1.ProjectSettings.getDatabasePort(),
            username: ProjectSettings_1.ProjectSettings.getDatabaseUser(),
            password: ProjectSettings_1.ProjectSettings.getDatabasePassword(),
            database: ProjectSettings_1.ProjectSettings.getDatabaseName(),
            entities: [__dirname + '/../model/entity/*{.ts,.js}'],
            synchronize: ProjectSettings_1.ProjectSettings.DATABASE_SYNC_ENABLED,
            charset: "utf8mb4",
            collation: "utf8mb4_general_ci",
            autoSchemaSync: true,
            logging: false,
            cache: false,
        };
        return options;
    }
    drop() {
        this.mLogger.info("Database dropping");
        this.mConnection.dropDatabase();
    }
}
exports.DatabaseHelper = DatabaseHelper;
//# sourceMappingURL=DatabaseHelper.js.map