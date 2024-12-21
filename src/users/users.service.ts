import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserAuth } from './entities/user-auth.entity';


@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      email : 'john@gmail.com',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      email : 'maria@gmail.com',
      password: 'guess',
    },
  ];
  async findOne(username: string): Promise<UserAuth | undefined> {
    return this.users.find(user => user.username === username);
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  
  
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}


