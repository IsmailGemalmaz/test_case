import { Action } from "routing-controllers";
export declare class AuthCheckerService {
    private mUserRepository;
    private mRoleService;
    private mJwtTokenService;
    checkToken: (action: Action, roles?: any) => Promise<boolean>;
    private parseToken;
}
