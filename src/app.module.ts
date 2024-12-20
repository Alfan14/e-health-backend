import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

import * as dotenv from 'dotenv';
import { join } from 'path';
import { HospitalsModule } from './hospitals/hospitals.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../.env'),
      isGlobal: true, 
    }),
    UsersModule,
    CatsModule,
    DatabaseModule.forRoot([User], {}),
    HospitalsModule,
  ],
  controllers: [AppController, CatsController ],
  providers: [AppService, CatsService, DatabaseService ],
  exports: [DatabaseModule],
})
export class AppModule {}