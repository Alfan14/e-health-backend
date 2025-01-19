import { Controller, Get, Post, Body, Put, Param,Res, Delete , HttpStatus, NotFoundException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto ,  UserProfileDto} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';


@Controller('/api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {
    
  }
  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  //Get specific users
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  // Create users
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  // Update specific users
  @Put(':id')
  async update (@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  // Delete specific users
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
    }

    // Login page
  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
      const newUSer = await this.usersService.signup(user);
      return response.status(HttpStatus.CREATED).json({
          newUSer
      })
  }
  @Post('/signin')
  async SignIn(@Res() response, @Body() user: User) {
      const token = await this.usersService.signin(user, this.jwtService);
      return response.status(HttpStatus.OK).json(token)
  }
  }
  
