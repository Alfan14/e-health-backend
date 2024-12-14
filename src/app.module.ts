import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';



@Module({
  imports: [UsersModule,CatsModule,DatabaseModule.forRoot([User])],
  controllers: [AppController,CatsController],
  providers: [AppService,CatsService],
  exports: [DatabaseModule],
})
export class AppModule {}

