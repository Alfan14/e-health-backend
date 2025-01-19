import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '../../utils/constants';
import { join } from 'path';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
          secret,
          signOptions: { expiresIn: '5m' },
        }),
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public'),
        }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
