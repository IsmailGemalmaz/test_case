import { EntityRepository, Repository } from "typeorm";
import { Service } from "typedi";
import { User } from "../model/entity/User";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async isEmailExists(email: string): Promise<boolean> {
        const user = await this.createQueryBuilder("user")
                               .select(["user.email"])
                               .where("user.email = :email", {email})
                               .getOne();
        return user ? true : false;
    }

    public async getForLogin(email: string): Promise<User> {
        return await this.createQueryBuilder("user")
                         .select(["user"])
                         .where("user.email = :email", {email: email})
                         .getOne();
    }

    public async getEmail(): Promise<User> {
        return await this.createQueryBuilder("user")
                         .select(["user.email"])
                         .getOne();
    }
    public async getByEmailForResetPassword(email: string): Promise<any> {
        return await this.createQueryBuilder("user")
                         .select(["user.email", "user.id"])
                         .where("user.email = :email", {email})
                         .getOne();
    }

}