import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInvites } from 'src/entities/userInvites/user-invites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserInvite {
  constructor(
    @InjectRepository(UserInvite)
    private readonly userInviteRepository: Repository<UserInvites>,
  ) {}
}
