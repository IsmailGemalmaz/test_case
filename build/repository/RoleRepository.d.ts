import { Repository } from 'typeorm';
import { Role } from '../model/entity/Role';
export declare class RoleRepository extends Repository<Role> {
    getByUserId(userId: number): Promise<any>;
    insert(role: Role): Promise<any>;
}
