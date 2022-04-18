import { User } from "../model/entity/User";
import { UserResponse } from '../model/response/UserResponse';
export declare class UserService {
    private mUserRepository;
    private mJwtTokenService;
    private mRoleService;
    private mMailService;
    find(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    register(user: User): Promise<any>;
    login(email: string, password: string): Promise<any>;
    refreshToken(previousToken: string, userId: number): Promise<UserResponse>;
    resetPassword(email: string): Promise<void>;
    changePassword(id: number, password: string): Promise<any>;
}
