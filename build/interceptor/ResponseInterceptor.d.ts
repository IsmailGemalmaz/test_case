import { Action, InterceptorInterface } from 'routing-controllers';
export declare class ResponseInterceptor implements InterceptorInterface {
    intercept(action: Action, result: any): any | Promise<any>;
}
