import { Action, Interceptor, InterceptorInterface } from 'routing-controllers';

@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {
    intercept(action: Action, result: any): any | Promise<any> {
        action.response.result = result;
        result.message = '';
        result.success = action.response.statusCode === 200;
        result.statusCode = action.response.statusCode;
        return result;
    }
}
