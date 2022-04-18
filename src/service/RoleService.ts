import { Service } from "typedi";
import { Role } from "../model/entity/Role";
import { InjectRepository } from "typeorm-typedi-extensions";
import { RoleRepository } from "../repository/RoleRepository";
import { User } from "../model/entity/User";
import { RoleType } from "../constant/RoleType";

@Service()
export class RoleService {

    @InjectRepository()
    private mRoleRepository: RoleRepository;

    public async getByUserId(userId: number): Promise<Role> {
        return await this.mRoleRepository.getByUserId(userId);
    }

    public async save(user: User, roleType: RoleType = RoleType.USER): Promise<Role> {
        const role: Role = new Role();
        role.type = roleType;
        role.user = user;
        const savedRole = await this.mRoleRepository.save(role);
        savedRole.user = undefined;
        return savedRole;
    }

    public async update(role: Role) {
        await this.mRoleRepository.save(role);
    }
}
