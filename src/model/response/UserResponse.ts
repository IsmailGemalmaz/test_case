import { User } from '../entity/User';

export class UserResponse {
    constructor(public user: User, public token: string, public isTempPasswordCorrect?: boolean) {}
}
