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
exports.App = void 0;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const httpContext = require("express-http-context");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const http_1 = require("http");
const DatabaseHelper_1 = require("./helper/DatabaseHelper");
const LogManager_1 = require("./manager/LogManager");
const ProjectSettings_1 = require("./constant/ProjectSettings");
const routing_controllers_1 = require("routing-controllers");
const swaggerDocument = require("../src/swagger/openApi.json");
const AuthCheckerService_1 = require("./service/AuthCheckerService");
const CurrentUserCheckerService_1 = require("./service/CurrentUserCheckerService");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const swaggerUi = require("swagger-ui-express");
const JobManager_1 = require("./manager/JobManager");
dotenv.config();
class App {
    constructor() {
        this.intialize();
    }
    intialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.mLogger = typedi_1.Container.get(LogManager_1.LogManager);
                this.mLogger.info("Server starting");
                this.mExpressApp = express();
                (0, typeorm_1.useContainer)(typedi_1.Container);
                (0, routing_controllers_1.useContainer)(typedi_1.Container);
                this.prepareUses();
                yield this.connectToDatabase().then(isConnected => {
                    if (isConnected) {
                        this.startServer();
                        this.prepareRoutings();
                    }
                });
            }
            catch (error) {
                this.mLogger.error("Server start error: ", error);
                process.exit(1);
            }
        });
    }
    prepareUses() {
        this.mExpressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.mExpressApp.use(morgan('dev'));
        this.mExpressApp.use(cors());
        this.mExpressApp.use(bodyParser.raw({
            verify(req, res, buf) {
                req.rawBody = buf;
            }
        }));
        this.mExpressApp.use(bodyParser.text({
            verify(req, res, buf) {
                req.rawBody = buf;
            }
        }));
        this.mExpressApp.use(bodyParser.json({
            verify(req, res, buf) {
                req.rawBody = buf;
            },
        }));
        this.mExpressApp.use(bodyParser.urlencoded({
            extended: false,
            verify(req, res, buf) {
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
    prepareRoutings() {
        const authChecker = typedi_1.Container.get(AuthCheckerService_1.AuthCheckerService);
        const currentUserCheckerService = typedi_1.Container.get(CurrentUserCheckerService_1.CurrentUserCheckerService);
        this.mExpressApp = (0, routing_controllers_1.useExpressServer)(this.mExpressApp, {
            routePrefix: ProjectSettings_1.ProjectSettings.ROUTE_PREFIX,
            controllers: [__dirname + "/controller/*{.js,.ts}"],
            middlewares: [__dirname + "/middleware/*{.js,.ts}"],
            interceptors: [__dirname + "/interceptor/*{.js,.ts}"],
            authorizationChecker: authChecker.checkToken,
            currentUserChecker: currentUserCheckerService.getCurrentUserFromToken,
            cors: true,
            defaultErrorHandler: false,
        });
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseHelper = new DatabaseHelper_1.DatabaseHelper();
            return databaseHelper.connect();
        });
    }
    startServer() {
        const httpServer = (0, http_1.createServer)(this.mExpressApp);
        const port = parseInt(process.env.PORT);
        this.mLogger.info("HttpServer.listen, port: " + port);
        httpServer.listen(port, () => {
            this.mLogger.info("Server started, port: " + port);
            this.onServerStart();
        });
    }
    onServerStart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mJobManager = new JobManager_1.JobManager();
        });
    }
}
exports.App = App;
new App();
//# sourceMappingURL=App.js.map