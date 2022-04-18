import { User } from "./User";
export declare class JwtToken {
    id: number;
    token: string;
    createDate: number;
    updateDate: number;
    agent: string;
    user: User;
    beforeInsertion(): Promise<void>;
    beforeUpdate(): Promise<void>;
}
