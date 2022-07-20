import { HttpException, HttpStatus } from '@nestjs/common';

export class GoalsSharedEmpty extends HttpException {
  constructor() {
    const message = 'no shared goals yet';
    super(message, HttpStatus.OK);
  }
}
