import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    saltOrRounds: number = 10;

    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}
  
   
    async signIn(email: string, password: string) {
      const user = await this.usersService.findOne(email);
    
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
    
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
    
      const payload = { sub: user.userId, email: user.email };
    
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    
  
    async signUp(payload: CreateUserDto) {
      const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds)
  
      let data = {
        ...payload,
        password: hashPass
      }
  
      const user = await this.usersService.create(data);
      return user;
    }

  }

  