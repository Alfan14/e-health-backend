import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User} from './entities/user.entity';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


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
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

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

  async signup(user: Partial<User>): Promise<User>  {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
        username: user.username,
        email: user.email,
        password: hash
    }
    const newUser = this.userRepository.create(reqBody);
    
    return await this.userRepository.save(newUser);
  }

  async signin(user: User, jwt: JwtService): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where : { email: user.email },
    });
    if (foundUser) {
        const { password } = foundUser;
        if (bcrypt.compare(user.password, password)) {
            const payload = { email: user.email };
            return {
                token: jwt.sign(payload),
            };
        }
        return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }
    return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
  }

  async getOne(email): Promise<User> {
    return await this.userRepository.findOne({      
      where : { email },
  });
}
}


