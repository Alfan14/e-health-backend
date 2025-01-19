import { 
  Get,
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  NotFoundException
}
from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { Roles } from '../../shared/decorators/roles.decorator';
import { AuthUser } from '../../shared/decorators/auth-user.decorator';
import { JwtPayload } from './interface/jwt-payload.interface';
import { User } from '../users/interface/user.interface';



@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService,
    private usersService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() body: SigninUserDto): Promise<{ token: string }> {
        const user = await this.authService.signIn(body.email, body.password);

        if (!user)
            throw new NotFoundException("No user found");

        var token = await this.authService.createToken(user);

        return {
            token
        };
    }

    @Get('refresh-token')
    @Roles("user", "premium", "admin")
    async refreshToken(@AuthUser() user: JwtPayload): Promise<{ me: User, token: string }> {
        var me = await this.usersService.findMe(user.id);
        var token = await this.authService.createToken(me);

        return {
            me,
            token
        };
    }



  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
