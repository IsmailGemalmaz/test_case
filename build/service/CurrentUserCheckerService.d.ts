import { Action } from 'routing-controllers';
import { User } from '../model/entity/User';
export declare class CurrentUserCheckerService {
    getCurrentUserFromToken: (action: Action) => Promise<User>;
}
