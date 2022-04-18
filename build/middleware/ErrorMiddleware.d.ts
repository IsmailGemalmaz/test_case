import { ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Response } from 'express';
export declare class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Request, response: Response, next: any): Response;
}
