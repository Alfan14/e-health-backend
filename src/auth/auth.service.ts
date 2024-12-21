import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    saltOrRounds: number = 10;

    constructor(
      private usersService: UsersService ,
      private jwtService: JwtService
    ) {}
  
  async signIn(email, pass) {
    async signIn(email, password) {
        const user = await this.usersService.findOne(email);
        if (user?.password !== pass) {
        const isMatch = await bcrypt.compare(password, user?.password);
    
        if (!isMatch) {
          throw new UnauthorizedException();
        }
    
        const payload = { sub: user.userId, email: user.email };
    
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
  }
    async signUp(payload: CreateUserDto) {
      const user = await this.usersService.create(payload);
      const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds)
  
      let data = {
        ...payload,
        password: hashPass
      }
  
      const user = await this.usersService.create(data);
      return user;
    }

  }

  