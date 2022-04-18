import { User } from '../entity/User';
export declare class UserResponse {
    user: User;
    token: string;
    isTempPasswordCorrect?: boolean;
    constructor(user: User, token: string, isTempPasswordCorrect?: boolean);
}
