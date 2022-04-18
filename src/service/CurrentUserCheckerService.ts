import { Service } from 'typedi';
import { Action, ForbiddenError, UnauthorizedError } from 'routing-controllers';
import { getCustomRepository } from 'typeorm';
import { User } from '../model/entity/User';
import { TokenRepository } from '../repository/TokenRepository';

@Service()
export class CurrentUserCheckerService {

    /**
     * Returns user from token
     * @param action - Action object from routing controllers
     * @returns User object
     */
    public getCurrentUserFromToken = async (action: Action): Promise<User> => {
        const request: Request = action.request;
        let token: string = request.headers['authorization'].split(' ')[1];
        if (token == null) {
            throw new UnauthorizedError('Authorization required');
        }
        // if token was refreshed let's use the new token instead of the original one in the header request
        if (request['token']) {
            token = request['token'];
        }
        // getForUserChatMessage custom repo
        const tokenRepository = getCustomRepository(TokenRepository);
        // getForUserChatMessage token object with user data
        const tokenDataWithUser = await tokenRepository.get(token);
        if (!tokenDataWithUser) {
            throw new ForbiddenError('Can not find user associated with token');
        }
        return tokenDataWithUser.user;
    }
}
