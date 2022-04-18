import { Service } from "typedi";
import { UnauthorizedError } from "routing-controllers";
import { User } from "../model/entity/User";
import * as jwt from "jsonwebtoken";
import * as httpContext from "express-http-context";
import { JwtToken } from "../model/entity/JwtToken";
import { TokenRepository } from "../repository/TokenRepository";
import { UserRepository } from "../repository/UserRepository";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProjectSettings } from "../constant/ProjectSettings";
import { DateUtil } from "../util/DateUtil";
import { JwtUser } from "../model/entity/JwtUser";

@Service()
export class JwtTokenService {

    @InjectRepository()
    private mUserRepository: UserRepository;

    @InjectRepository()
    private mTokenRepository: TokenRepository;

    public async createNewTokenAndSave(user: User): Promise<string> {
        const jwtUser: JwtUser = new JwtUser();
        jwtUser.id = user.id;
        const token: string = await jwt.sign({jwtUser: jwtUser}, ProjectSettings.JWT_SECRET_KEY, {expiresIn: ProjectSettings.JWT_DEFAULT_TIME});
        let jwtToken: JwtToken = await this.mTokenRepository.getByUserId(user.id);
        if (jwtToken == null) {
            jwtToken = new JwtToken();
            jwtToken.agent = httpContext.get("useragent");
            jwtToken.user = user;
        }
        jwtToken.token = token;
        jwtToken.updateDate = DateUtil.getUtcNowInSec();
        await this.mTokenRepository.save(jwtToken);
        await this.mUserRepository.save(user);
        return token;
    }

    public async refreshToken(token: string): Promise<any> {
        const decoded = await this.decodeToken(token);
        const jwtUser: JwtUser = decoded["jwtUser"];
        const foundUser = await this.mUserRepository.findOne(jwtUser.id);
        if (foundUser) {
            const newToken = await this.createNewTokenAndSave(foundUser);
            return newToken;
        } else {
            throw new UnauthorizedError("JwtTokenService.UserNotFoundError");
        }
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, ProjectSettings.JWT_SECRET_KEY);
    }

    public decodeToken(token: string): any {
        return jwt.decode(token);
    }
}
