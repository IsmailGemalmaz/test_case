import {Service} from 'typedi';
import {EntityRepository, Repository} from 'typeorm';
import {JwtToken} from '../model/entity/JwtToken';

@Service()
@EntityRepository(JwtToken)
export class TokenRepository extends Repository<JwtToken> {

    public async get(token: string): Promise<JwtToken> {
        return await this.createQueryBuilder('jwtToken')
                         .leftJoinAndSelect('jwtToken.user', 'user')
                         .where('jwtToken.token = :token', {token})
                         .getOne();
    }

    public async getByUserId(userId: number): Promise<JwtToken> {
        return await this.createQueryBuilder("jwtToken")
                         .leftJoinAndSelect("jwtToken.user", "user")
                         .where("jwtToken.userId = :userId", {userId})
                         .getOne();
    }
}
