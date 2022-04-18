import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../model/entity/Role';

@Service()
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    public async getByUserId(userId: number): Promise<any> {
        return await this.createQueryBuilder('role')
                         .select('role')
                         .leftJoin('role.user', 'user')
                         .where('user.id = :userId', {userId})
                         .getOne();
    }

    public async insert(role: Role): Promise<any> {
        return await this.save(role);
    }
}