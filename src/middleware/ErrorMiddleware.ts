import { BadRequestError, ExpressErrorMiddlewareInterface, ForbiddenError, HttpError, InternalServerError, MethodNotAllowedError, Middleware, NotAcceptableError, NotFoundError, UnauthorizedError, } from 'routing-controllers';
import { LogManager } from '../manager/LogManager';
import { Container } from 'typedi';
import { Response } from 'express';
import { BaseResponse } from '../model/response/BaseResponse';
import { HttpStatusCode } from '../constant/HttpStatusCode';
import { ProjectSettings } from "../constant/ProjectSettings";

@Middleware({type: 'after'})
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {

    error(error: any, request: Request, response: Response, next: any): Response {
        let status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
        const logger = Container.get(LogManager);
        const baseResponse: BaseResponse = new BaseResponse();
        const apiError: any = {};
        baseResponse.message = error.message;
        baseResponse.success = false;
        if (error instanceof HttpError ||
            error instanceof BadRequestError ||
            error instanceof ForbiddenError ||
            error instanceof InternalServerError ||
            error instanceof MethodNotAllowedError ||
            error instanceof NotAcceptableError ||
            error instanceof NotFoundError ||
            error instanceof UnauthorizedError) {
            status = error.httpCode;
        }

        if (status >= 400 && status < 500) {
            logger.warn(error);
        }
        if (status >= 500) {
            logger.error(error.message);
            if (!ProjectSettings.IS_PROD) {
                apiError.stack = error.stack;
            }
        }
        return response
            .status(status)
            .type('json')
            .json(baseResponse);
    }

}
