import { HttpException, HttpStatus } from '@nestjs/common';

export class InviteSignatureError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
