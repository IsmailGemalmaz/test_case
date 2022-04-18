import { Repository } from 'typeorm';
import { JwtToken } from '../model/entity/JwtToken';
export declare class TokenRepository extends Repository<JwtToken> {
    get(token: string): Promise<JwtToken>;
    getByUserId(userId: number): Promise<JwtToken>;
}
