import { Article } from "./Article";
import { Comment } from "./Comment";
import { JwtToken } from './JwtToken';
import { Role } from './Role';
export declare class User {
    id: number;
    createDate: number;
    password: string;
    tempPassword: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    token: JwtToken[];
    article: Article[];
    comment: Comment[];
    beforeInsertion(): Promise<void>;
    beforeUpdate(): Promise<void>;
    isPasswordCorrect(password: string): Promise<boolean>;
    isTempPasswordCorrect(passwordToCompare: string): Promise<boolean>;
    updatePassword(): Promise<void>;
    updateTempPassword(): Promise<void>;
}
