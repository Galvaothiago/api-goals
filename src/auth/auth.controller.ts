import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from 'src/decorators/endpoint-public.decorator';
import { CreateUserDto } from 'src/entities/user/dto/create-user.dto';
import { User } from 'src/entities/user/user.entity';
import { UserService } from 'src/services/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';

interface AuthRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @IsPublic()
  @Get('/:username')
  verfifyUsername(@Param('username') username: string) {
    if (!!username) {
      return this.userService.usernameAlreadyExists(username);
    }
  }

  @IsPublic()
  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login(@Request() request: AuthRequest) {
    return this.authService.login(request.user);
  }
}
