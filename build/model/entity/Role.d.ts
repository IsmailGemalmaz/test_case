import { User } from './User';
import { RoleType } from '../../constant/RoleType';
export declare class Role {
    id: number;
    type: RoleType;
    user: User;
}
