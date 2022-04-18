import { BaseController } from "./BaseController";
import { User } from "../model/entity/User";
export declare class UserController extends BaseController {
    private mUserService;
    register(user: User): Promise<any>;
    login(email: string, password: string): Promise<any>;
    refreshToken(previousToken: string, userId: number): Promise<any>;
    changePassword(userId: number, password: string): Promise<any>;
    resetPassword(email: string): Promise<any>;
    get(): Promise<any>;
}
