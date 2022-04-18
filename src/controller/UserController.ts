import { Authorized, Body, BodyParam, JsonController, Post, Put,Get } from "routing-controllers";
import { BaseController } from "./BaseController";
import { User } from "../model/entity/User";
import { Inject, Service } from "typedi";
import { UserService } from "../service/UserService";
import { Token, UserId } from '../decorator/UserDecorator';
import { RoleType } from "../constant/RoleType";

@Service()
@JsonController("/user")
export class UserController extends BaseController {

    @Inject(type => UserService)
    private mUserService: UserService;

    @Post("/register")
    async register(@Body({validate: true}) user: User): Promise<any> {
        return await this.mUserService.register(user);
    }

    @Post("/login")
    async login(@BodyParam("email") email: string, @BodyParam("password") password: string): Promise<any> {
        return await this.mUserService.login(email, password);
    }

    @Authorized()
    @Post("/refreshToken")
    async refreshToken(@Token() previousToken: string, @UserId() userId: number): Promise<any> {
        return await this.mUserService.refreshToken(previousToken, userId);
    }

    @Authorized()
    @Put("/changePassword")
    @Authorized()
    async changePassword(@UserId() userId: number, @BodyParam("password") password: string): Promise<any> {
        return await this.mUserService.changePassword(userId, password);
    }

    @Post("/resetPassword")
    async resetPassword(@BodyParam("email") email: string): Promise<any> {
        await this.mUserService.resetPassword(email);
        return {isSend: true};
    }


    @Authorized({roles: [RoleType.ADMIN]})
    @Get("/getAll")
    async get(): Promise<any> {
        const users: User[] = await this.mUserService.find()
        return {user:users}
    }

}