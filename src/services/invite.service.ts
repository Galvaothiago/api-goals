import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInviteDto } from 'src/entities/invite/dto/create-invite.dto';
import { Invite } from 'src/entities/invite/invite.entity';
import { InviteCodeError } from 'src/exceptions/invite-code.exception';
import { InviteSignatureError } from 'src/exceptions/invite-signture.exception';
import { InviteErrorException } from 'src/exceptions/invites-error.exception';
import { NoInviteException } from 'src/exceptions/no-invites.exception';
import { Repository } from 'typeorm';
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

    return signedInvite;
  }

  async getInvitesInfoIssued(username: string) {
    try {
      const createdInvites = await this.inviteRepository.findBy({
        issued_by: username,
      });

      return createdInvites;
    } catch (err) {
      throw new InviteErrorException(err.message);
    }
  }

  async validateCodeInvite(code: string, username: string) {
    const inviteCode = await this.inviteRepository.findOneBy({
      invite_code: code,
    });

    if (!inviteCode) throw new InviteCodeError('Invalid code!');
    if (inviteCode.issued_by === username)
      throw new InviteSignatureError(
        'Invalid signature, user who issued is the same user who is trying to sign',
      );

    const codeAlreadyUsed = inviteCode.code_used;
    return codeAlreadyUsed ? false : true;
  }

  async signCodeReceived(username: string, code: string) {
    const isCodeValid = await this.validateCodeInvite(code, username);

    if (!isCodeValid) throw new InviteCodeError('Code has already been used!');

    const invite = await this.inviteRepository.findOneBy({ invite_code: code });

    const signCode = {
      ...invite,
      consumed_by: username,
      checked_at: new Date(),
      code_used: true,
    };

    return await this.inviteRepository.update(invite.id, signCode);
  }
}
