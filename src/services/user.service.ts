import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/entities/user/dto/create-user.dto';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserExistsException } from 'src/exceptions/user-exists.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async usernameAlreadyExists(username: string) {
    const userByUsername = await this.userRepository.findBy({ username });

    const usernameAlreadyExists = userByUsername[0]?.username === username;

    if (usernameAlreadyExists) {
      return true;
    }

    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const userNameExists = await this.usernameAlreadyExists(
      createUserDto.username,
    );

    const saltRounds = 10;

    const errorMessage = `${createUserDto.username} already exists!`;

    if (userNameExists) {
      throw new UserExistsException(errorMessage);
    }

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
    };

    const userCreated = await this.userRepository.save(data);

    return {
      ...userCreated,
      password: undefined,
    };
  }

  async findByUsername(username: string) {
    return await this.userRepository.findBy({ username });
  }
}
