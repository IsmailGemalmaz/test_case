import { Repository } from "typeorm";
import { User } from "../model/entity/User";
export declare class UserRepository extends Repository<User> {
    isEmailExists(email: string): Promise<boolean>;
    getForLogin(email: string): Promise<User>;
    getEmail(): Promise<User>;
    getByEmailForResetPassword(email: string): Promise<any>;
}
