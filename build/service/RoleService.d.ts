import { Role } from "../model/entity/Role";
import { User } from "../model/entity/User";
import { RoleType } from "../constant/RoleType";
export declare class RoleService {
    private mRoleRepository;
    getByUserId(userId: number): Promise<Role>;
    save(user: User, roleType?: RoleType): Promise<Role>;
    update(role: Role): Promise<void>;
}
