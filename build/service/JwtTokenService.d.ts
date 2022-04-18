import { User } from "../model/entity/User";
export declare class JwtTokenService {
    private mUserRepository;
    private mTokenRepository;
    createNewTokenAndSave(user: User): Promise<string>;
    refreshToken(token: string): Promise<any>;
    verifyToken(token: string): any;
    decodeToken(token: string): any;
}
