import {Action, createParamDecorator, UnauthorizedError} from "routing-controllers";
import * as jwt from "jsonwebtoken";
import {ProjectSettings} from "../constant/ProjectSettings";
import {JwtUser} from "../model/entity/JwtUser";

export function UserId() {
    return createParamDecorator({
        value: async (action: Action) => {
            const authorization: string = action.request.headers["authorization"];
            const token: string = authorization;
            if (token == null) {
                return null;
            } else {
                const jwtTokenDecoded = await jwt.verify(token, ProjectSettings.JWT_SECRET_KEY, {ignoreExpiration: true});
                const jwtUser: JwtUser = jwtTokenDecoded["jwtUser"];
                return jwtUser.id;
            }
        },
    });
}

export function Token() {
    return createParamDecorator({
        value: async (action: Action) => {
            const authorization: string = action.request.headers["authorization"];
            const token: string = authorization;
            return token;
        },
    });
}
