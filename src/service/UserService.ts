import { Inject, Service } from "typedi";
import { User } from "../model/entity/User";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../repository/UserRepository";
import { JwtTokenService } from './JwtTokenService';
import { UserResponse } from '../model/response/UserResponse';
import { BadRequestError, UnauthorizedError } from 'routing-controllers';
import { MailService } from './MailService';
import { RoleService } from './RoleService';
import passwordGenerator = require("generate-password");

@Service()
export class UserService {

    @InjectRepository(User)
    private mUserRepository: UserRepository;

    @Inject(() => JwtTokenService)
    private mJwtTokenService: JwtTokenService;

    @Inject(() => RoleService)
    private mRoleService: RoleService;

    @Inject(() => MailService)
    private mMailService: MailService;

    public async find(): Promise<User[]> {
        return await this.mUserRepository.find();
    }

    public async findOne(id: number): Promise<User> {
        return await this.mUserRepository.findOne(id);
    }

    public async register(user: User): Promise<any> {
        const isEmailExist = await this.mUserRepository.isEmailExists(user.email);
        if (isEmailExist == false) {
            let savedUser: User = await this.mUserRepository.save(user);
            await this.mRoleService.save(savedUser);
            const token = await this.mJwtTokenService.createNewTokenAndSave(user);
            return new UserResponse(savedUser, token)
        } else {
            new BadRequestError("Email Exist.");
        }

    }

    public async login(email: string, password: string): Promise<any> {
        let user = await this.mUserRepository.getForLogin(email);
        if (user) {
            const isPasswordCorrect = await user.isPasswordCorrect(password);
            const isTempPasswordCorrect = await user.isTempPasswordCorrect(password);
            if (isPasswordCorrect || isTempPasswordCorrect) {
                const token = await this.mJwtTokenService.createNewTokenAndSave(user);
                return new UserResponse(user, token, isTempPasswordCorrect);
            } else {
                throw new BadRequestError("AuthServiceLoginWrongPasswordError");
            }
        } else {
            throw new BadRequestError("AuthServiceLoginUserNotFoundError");
        }
    }

    public async refreshToken(previousToken: string, userId: number) {
        const user: User = await this.mUserRepository.findOne(userId);
        if (user) {
            const token: string = await this.mJwtTokenService.refreshToken(previousToken);
            return new UserResponse(user, token);
        } else {
            throw new UnauthorizedError("AuthCheckerServiceUserNotLongerExistsError");
        }
    }

    public async resetPassword(email: string) {
        const user = await this.mUserRepository.getByEmailForResetPassword(email);
        if (user == null) {
            throw new BadRequestError("User not found.");
        } else {
            const generatedPassword = passwordGenerator.generate({
                length: 6,
                numbers: true,
            }).toUpperCase();
            await this.mMailService.sendTempPassword(user.email, generatedPassword);
            user.tempPassword = generatedPassword;
            await this.mUserRepository.save(user);
        }
    }

    public async changePassword(id: number, password: string): Promise<any> {
        if (password == null) {
            throw new BadRequestError("Please enter password");
        } else {
            const user = await this.mUserRepository.findOne(id);
            if (!user) {
                throw new BadRequestError("User not found/");
            } else {
                user.password = password;
                user.tempPassword = null;
                await this.mUserRepository.save(user);
                return {isChanged: true};
            }
        }
    }
}