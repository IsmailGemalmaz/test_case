"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.UserId = void 0;
const routing_controllers_1 = require("routing-controllers");
const jwt = require("jsonwebtoken");
const ProjectSettings_1 = require("../constant/ProjectSettings");
function UserId() {
    return (0, routing_controllers_1.createParamDecorator)({
        value: (action) => __awaiter(this, void 0, void 0, function* () {
            const authorization = action.request.headers["authorization"];
            const token = authorization;
            if (token == null) {
                return null;
            }
            else {
                const jwtTokenDecoded = yield jwt.verify(token, ProjectSettings_1.ProjectSettings.JWT_SECRET_KEY, { ignoreExpiration: true });
                const jwtUser = jwtTokenDecoded["jwtUser"];
                return jwtUser.id;
            }
        }),
    });
}
exports.UserId = UserId;
function Token() {
    return (0, routing_controllers_1.createParamDecorator)({
        value: (action) => __awaiter(this, void 0, void 0, function* () {
            const authorization = action.request.headers["authorization"];
            const token = authorization;
            return token;
        }),
    });
}
exports.Token = Token;
//# sourceMappingURL=UserDecorator.js.map