
import { Roles } from 'src/decorators/roles.decorator';
import { Controller, Get, Query, Post, Body, Put, Param, Delete,UseGuards ,} from '@nestjs/common';
import { CreateCatDto , UpdateCatDto, ListAllEntities } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import {Role} from 'src/enums/role.enum';
import {AuthGuard} from 'src/guards/auth.guard';
import {RoleGuard} from 'src/guards/role.guard';

@Controller('cats')
export class CatsController {
  // Dependency Injection
  constructor(private catsService: CatsService) {}
  // HTTP request
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
  // Roles 
  @Get('admin')
  @Roles(Role.ADMIN) 
  @UseGuards(AuthGuard, RoleGuard) 
  async adminOnlyEndpoint() {
    return "Welcome admin";
  }

  @Get('user-moderator')
  @Roles(Role.USER, Role.MODERATOR) 
  @UseGuards(AuthGuard, RoleGuard)  
  async userModeratorEndpoint() {
    return "Welcome user or moderator";
  }
}
