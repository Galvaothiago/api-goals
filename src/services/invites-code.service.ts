import { Injectable } from '@nestjs/common';
import { InviteCode } from 'src/entities/inviteCodes/invites-codes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InviteCodeService {
  constructor(private readonly inviteCodeRepository: Repository<InviteCode>) {}
}
