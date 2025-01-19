import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './interface/user.interface';
import { UserEntity } from './entities/user.entity';


@Injectable()

export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      email : 'john@gmail.com',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      email : 'maria@gmail.com',
      password: 'guess',
    },
  ];
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const userEntity = new UserEntity();

    userEntity.pseudo = user.pseudo;
    userEntity.password = user.password;
    userEntity.email = user.email;
    userEntity.role = "user";

    let userCreated = await this.userRepository.save(userEntity);
    delete userCreated.password;
    return userCreated;
  }

  async findForAuth(email: string): Promise<User> {
    return await this.userRepository
        .createQueryBuilder("user")
        .select([
            "user.password",
            "user.email",
            "user.id",
            "user.role"
        ])
        .where("user.email = :email", { email: email })
        .getOne();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  
  async findMe(userId): Promise<User> {
    return await this.userRepository
        .createQueryBuilder("user")
        .select([
            "user.id",
            "user.email",
            "user.role",
            "user.pseudo"
        ])
        .where("user.id = :userId", { userId })
        .getOne();
  }

}


