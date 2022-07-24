import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateInviteDto } from 'src/entities/invite/dto/create-invite.dto';
import { User } from 'src/entities/user/user.entity';
import { InviteService } from 'src/services/invite.service';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('/')
  createInvite(@CurrentUser() user: User) {
    return this.inviteService.saveCodeInvite(user.username);
  }

  @Get('/')
  getInfoIssuedInviteByUsername(@CurrentUser() user: User) {
    return this.inviteService.getInvitesInfoIssued(user.username);
  }

  @Get('/received/:code')
  confirmInviteReceived(
    @Param('code') code: string,
    @CurrentUser() user: User,
  ) {
    return this.inviteService.signCodeReceived(user.username, code);
  }
}
