import { CreateUserDto } from '../users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { User } from '../users/interface/user.interface';
import { ConfigService } from 'src/shared/config/config.service';


@Injectable()
export class AuthService {
    saltOrRounds: number = 10;

    constructor(private userService: UsersService,
      private config: ConfigService) { }
  
   
    async signIn(email: string, password: string): Promise<User> {
      const user = await this.userService.findForAuth(email);
      if (!user) return null;

      const match = await bcrypt.compare(password, user.password);
      if (!match) return null;

      return user;
  }
    async signUp(user: User): Promise<User> {
      user.password = await bcrypt.hash(user.password, this.saltOrRounds);
      return await this.userService.create(user);
  }

    async createToken(user: User): Promise<string> {
      const jwtPayload: JwtPayload = { id: user.id, email: user.email, role: user.role };
      return await jwt.sign(jwtPayload, this.config.environment.secretKey, { expiresIn: "365d" });
    }

  }

  