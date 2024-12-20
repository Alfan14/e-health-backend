import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbPort = this.configService.get<number>('DB_PORT');
    const dbUser = this.configService.get<string>('DB_USER');
    const dbPass = this.configService.get<string>('DB_PASS');
    const dbName = this.configService.get<string>('DB_NAME');
  }
}
