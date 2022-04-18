import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as httpContext from "express-http-context"; //
import { Container } from "typedi";
import { useContainer as useContainerORM } from "typeorm";
import { createServer, Server as HttpServer } from "http";
import { DatabaseHelper } from "./helper/DatabaseHelper";
import { LogManager } from "./manager/LogManager";
import { ProjectSettings } from "./constant/ProjectSettings";
import { useContainer as useContainerRouting, useExpressServer } from "routing-controllers";
import * as swaggerDocument from '../src/swagger/openApi.json'
import { AuthCheckerService } from './service/AuthCheckerService';
import { CurrentUserCheckerService } from './service/CurrentUserCheckerService';
import bodyParser = require("body-parser");
import uuid = require("uuid");
import swaggerUi = require("swagger-ui-express");
import {JobManager} from "./manager/JobManager"

dotenv.config();

// ******** swagger link ===>> http://localhost:4000/api-docs/#/ *********
export class App {

    
    private mExpressApp: express.Application;
    private mLogger: LogManager;
    private mJobManager:JobManager;
    constructor() {
        this.intialize();
    }

    private async intialize() {
        try {
            this.mLogger = Container.get(LogManager);
            this.mLogger.info("Server starting");
            this.mExpressApp = express();
            useContainerORM(Container)
            useContainerRouting(Container);
            this.prepareUses();
            await this.connectToDatabase().then(isConnected => {
                if (isConnected) {
                    this.startServer();
                    this.prepareRoutings();
                    
                }
            });
        } catch (error) {
            this.mLogger.error("Server start error: ", error);
            process.exit(1);
        }
    }

    private prepareUses() {

        this.mExpressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.mExpressApp.use(morgan('dev'))
        this.mExpressApp.use(cors())
        this.mExpressApp.use(bodyParser.raw({
            verify(req: any, res, buf): void {
                req.rawBody = buf;
            }
        }));
        this.mExpressApp.use(bodyParser.text({
            verify(req: any, res, buf): void {
                req.rawBody = buf;
            }
        }));
        this.mExpressApp.use(bodyParser.json({
            verify(req: any, res, buf) {
                req.rawBody = buf;
            },
        }));
        this.mExpressApp.use(bodyParser.urlencoded({
            extended: false,
            verify(req: any, res, buf) {
                req.rawBody = buf;
            }
        }));

        this.mExpressApp.use(httpContext.middleware);
        this.mExpressApp.use((req, res, next) => {
            httpContext.set("reqId", uuid.v1());
            httpContext.set("useragent", req.headers["user-agent"]);
            httpContext.set("ip", req.ip);
            next();

        });
        this.mExpressApp.use(express.static("public"));
    }

    private prepareRoutings() {
        const authChecker: AuthCheckerService = Container.get(AuthCheckerService);
        const currentUserCheckerService: CurrentUserCheckerService = Container.get(CurrentUserCheckerService);
        this.mExpressApp = useExpressServer(this.mExpressApp, {
            routePrefix: ProjectSettings.ROUTE_PREFIX,
            controllers: [__dirname + "/controller/*{.js,.ts}"],
            middlewares: [__dirname + "/middleware/*{.js,.ts}"],
            interceptors: [__dirname + "/interceptor/*{.js,.ts}"],
            authorizationChecker: authChecker.checkToken,
            currentUserChecker: currentUserCheckerService.getCurrentUserFromToken,
            cors: true,
            defaultErrorHandler: false,
        });
    }

    private async connectToDatabase(): Promise<boolean> {
        const databaseHelper: DatabaseHelper = new DatabaseHelper();
        return databaseHelper.connect();
    }

    private startServer() {
        const httpServer: HttpServer = createServer(this.mExpressApp);
        const port = parseInt(process.env.PORT);
        this.mLogger.info("HttpServer.listen, port: " + port);
        httpServer.listen(port, () => {
            this.mLogger.info("Server started, port: " + port);
            this.onServerStart();
        });
    }

    private async onServerStart() {
        this.mJobManager=new JobManager();
    }

}

new App();