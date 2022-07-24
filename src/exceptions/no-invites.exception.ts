import { HttpException, HttpStatus } from '@nestjs/common';

export class NoInviteException extends HttpException {
  constructor() {
    super('No invites to share!', HttpStatus.OK);
  }
}
