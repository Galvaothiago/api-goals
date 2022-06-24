import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/entities/user/dto/create-user.dto';
import { User } from 'src/entities/user/user.entity';
import { UserService } from 'src/services/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';

interface RequestAuth extends Request {
  user: User;
}

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:username')
  verfifyUsername(@Param('username') username: string) {
    if (!!username) {
      return this.userService.usernameAlreadyExists(username);
    }
  }

  @Post('signup')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login(@Request() request: RequestAuth) {
    return this.authService.login(request.user);
  }
}
