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

  createCodeInvite(size: number) {
    const caracters = '#abcdefghijklmnopqrstuvxzywABCDEFGHIJKLMNOPQRSTUVXZYW@';
    const numbers = '1234567890';

    let finalCode = '';
    let halfCaracters = [];
    let halfNumbers = [];

    const random = (length: number) => {
      return Math.round(Math.random() * (length - 1));
    };

    const createCodeWithSize = (size: number) => {
      for (let i = 0; i < size; i++) {
        if (i % 2 === 0) {
          halfNumbers.push(numbers[random(numbers.length)]);
        } else {
          halfCaracters.push(caracters[random(caracters.length)]);
        }
      }

      finalCode = `${halfCaracters.join('')}-${halfNumbers.join('')}`;
    };

    switch (size) {
      case 6:
        createCodeWithSize(size);
        break;

      case 8:
        createCodeWithSize(size);
        break;

      default:
        createCodeWithSize(6);
        break;
    }

    return finalCode;
  }

  async findByUsername(username: string) {
    return await this.userRepository.findBy({ username });
  }
}
