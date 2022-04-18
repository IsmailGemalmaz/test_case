import { JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger, LogManager } from '../manager/LogManager';

@Service()
@JsonController()
export class BaseController {

    @Logger(__filename)
    public logger: LogManager;

}
