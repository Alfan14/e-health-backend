import { Inject, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';


import { environment as environmentDev } from '../../enviroments/enviroment.dev';
import { environment as environmentStaging } from '../../enviroments/enviroment.staging';
import { environment as environmentProd } from '../../enviroments/enviroment.prod';

@Injectable()
export class ConfigService {
    public environment;
    public ormConfig;

    constructor() {
        Logger.log(`Configuration : ${process.env.ENV || 'DEV'}`);

        switch (process.env.ENV) {
            case 'PROD':
                this.environment = environmentProd;
                break;
            case 'STAGING':
                this.environment = environmentStaging;
                break;
            default:
                this.environment = environmentDev;
                break;
        }
    }
}