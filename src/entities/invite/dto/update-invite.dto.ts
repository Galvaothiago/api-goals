import { PartialType } from '@nestjs/mapped-types';
import { Invite } from '../invite.entity';

export class UpdateInviteDto extends PartialType(Invite) {}
