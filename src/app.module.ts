import { Module ,NestModule, RequestMethod, MiddlewareConsumer} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { User } from './users/entities/user.entity';
import { join } from 'path';
import { HospitalsModule } from './hospitals/hospitals.module';
import { AuthModule } from './auth/auth.module';
import { Hospital } from './hospitals/hospital/hospital.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../.env'),
      isGlobal: true, 
    }),
    UsersModule,
    CatsModule,
    DatabaseModule.forRoot([User,Hospital], {}),
    HospitalsModule,
    AuthModule,
  ],
  controllers: [AppController, CatsController ],
  providers: [AppService, CatsService, DatabaseService],
  exports: [DatabaseModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}