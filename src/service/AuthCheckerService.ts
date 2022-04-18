import { Action, UnauthorizedError } from "routing-controllers";
import { Inject, Service } from "typedi";
import { Request } from "express";
import { DEFAULT_ROLE_TYPE, getRoleTypeWeight, RoleType } from "../constant/RoleType";
import { JwtTokenService } from "./JwtTokenService";
import * as jwt from "jsonwebtoken";
import { InjectRepository } from "typeorm-typedi-extensions";
import { RoleService } from "./RoleService";
import { UserRepository } from "../repository/UserRepository";
import { JwtUser } from "../model/entity/JwtUser";

@Service()
export class AuthCheckerService {

    @InjectRepository()
    private mUserRepository: UserRepository;

    @Inject(() => RoleService)
    private mRoleService: RoleService;

    @Inject(() => JwtTokenService)
    private mJwtTokenService: JwtTokenService;

    public checkToken = async (action: Action, roles?: any): Promise<boolean> => {
        const request: Request = action.request;
        const jwtUser: JwtUser = this.parseToken(request);
        const foundUser = await this.mUserRepository.findOne({id: jwtUser.id});
        if (foundUser) {
            const role = roles[0];
            let requiredRoleTypes: RoleType[] = null;
            if (roles && roles.length) {
                requiredRoleTypes = roles;
            } else {
                requiredRoleTypes = role && role.roles ? role.roles : [DEFAULT_ROLE_TYPE];
            }
            const userRole = await this.mRoleService.getByUserId(jwtUser.id);
            if (userRole) {
                const userRoleType = userRole.type;
                const matchedRoles = requiredRoleTypes.filter((requiredRoleType) =>
                    getRoleTypeWeight(userRoleType) >= getRoleTypeWeight(requiredRoleType)
                );
                return matchedRoles.length > 0;
            } else {
                throw new UnauthorizedError("AuthCheckerServiceUserRoleNotFoundError");
            }
        } else {
            throw new UnauthorizedError("AuthCheckerServiceUserNotFoundError");
        }
    };

    private parseToken(request: Request): JwtUser {
        const token = request.get("authorization");
        if (token) {
            try {
                const jwtToken = this.mJwtTokenService.verifyToken(token);
                const jwtUser: JwtUser = jwtToken["jwtUser"];
                if (jwtUser) {
                    return jwtUser;
                } else {
                    throw new UnauthorizedError("AuthCheckerServiceInvalidTokenDataError");
                }
            } catch (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    throw new UnauthorizedError("AuthCheckerServiceTokenExpiredError");
                } else {
                    throw new UnauthorizedError("AuthCheckerServiceInvalidTokenError");
                }
            }
        } else {
            throw new UnauthorizedError("AuthCheckerServiceAuthRequiredError");
        }
    }
}
