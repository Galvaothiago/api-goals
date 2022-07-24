import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInviteDto } from 'src/entities/invite/dto/create-invite.dto';
import { Invite } from 'src/entities/invite/invite.entity';
import { NoInviteException } from 'src/exceptions/no-invites.exception';
import { Repository } from 'typeorm';
import { SharingService } from './sharing.service';
import { UserService } from './user.service';

@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: Repository<Invite>,
    private readonly userService: UserService,
  ) {}

  createCodeInvite(size?: number) {
    const caracters = '#abcdefghijklmnopqrstuvxzywABCDEFGHIJKLMNOPQRSTUVXZYW@';
    const numbersTimestamp = String(new Date().getTime());

    let finalCode = '';
    let halfCaracters = [];
    let halfNumbers = [];

    const random = (length: number) => {
      return Math.round(Math.random() * (length - 1));
    };

    const createCodeWithSize = (size: number) => {
      for (let i = 0; i < size; i++) {
        if (i % 2 === 0) {
          halfNumbers.push(numbersTimestamp[random(numbersTimestamp.length)]);
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

  async saveCodeInvite(username: string) {
    const createInvite = new CreateInviteDto();

    const signedInvite = {
      ...createInvite,
      invite_code: this.createCodeInvite(),
      issued_by: username,
    };

    const canCreateInvite = await this.userService.canCreateInvite(username);

    if (!canCreateInvite) {
      throw new NoInviteException();
    }

    await this.inviteRepository.save(signedInvite);
    await this.userService.decreaseInvite(username);
  }

  getInvitesInfoIssued(username: string) {}
}
