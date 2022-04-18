"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const routing_controllers_1 = require("routing-controllers");
const LogManager_1 = require("../manager/LogManager");
const typedi_1 = require("typedi");
const BaseResponse_1 = require("../model/response/BaseResponse");
const HttpStatusCode_1 = require("../constant/HttpStatusCode");
const ProjectSettings_1 = require("../constant/ProjectSettings");
let ErrorMiddleware = class ErrorMiddleware {
    error(error, request, response, next) {
        let status = HttpStatusCode_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
        const logger = typedi_1.Container.get(LogManager_1.LogManager);
        const baseResponse = new BaseResponse_1.BaseResponse();
        const apiError = {};
        baseResponse.message = error.message;
        baseResponse.success = false;
        if (error instanceof routing_controllers_1.HttpError ||
            error instanceof routing_controllers_1.BadRequestError ||
            error instanceof routing_controllers_1.ForbiddenError ||
            error instanceof routing_controllers_1.InternalServerError ||
            error instanceof routing_controllers_1.MethodNotAllowedError ||
            error instanceof routing_controllers_1.NotAcceptableError ||
            error instanceof routing_controllers_1.NotFoundError ||
            error instanceof routing_controllers_1.UnauthorizedError) {
            status = error.httpCode;
        }
        if (status >= 400 && status < 500) {
            logger.warn(error);
        }
        if (status >= 500) {
            logger.error(error.message);
            if (!ProjectSettings_1.ProjectSettings.IS_PROD) {
                apiError.stack = error.stack;
            }
        }
        return response
            .status(status)
            .type('json')
            .json(baseResponse);
    }
};
ErrorMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'after' })
], ErrorMiddleware);
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=ErrorMiddleware.js.map