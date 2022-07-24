import { HttpException, HttpStatus } from '@nestjs/common';

const defaultMessage = 'User not found!';

export class UserNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || defaultMessage, HttpStatus.NOT_FOUND);
  }
}
