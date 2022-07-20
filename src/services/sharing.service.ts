import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateSharingDto } from 'src/entities/sharing/dto/create-sharing.dto';
import { Sharing } from 'src/entities/sharing/sharing.entity';
import { User } from 'src/entities/user/user.entity';
import { GoalsSharedEmpty } from 'src/exceptions/goals-shared-empty.exception';
import { SharingException } from 'src/exceptions/sharing-error.exception';
import { Repository } from 'typeorm';

@Injectable()
export class SharingService {
  constructor(
    @InjectRepository(Sharing)
    private readonly sharingRepository: Repository<Sharing>,
  ) {}

  async getSharingByUsername(username: string) {
    const goalsShared = await this.sharingRepository.findBy({
      username_to: username,
    });

    if (!goalsShared) {
      throw new GoalsSharedEmpty();
    }

    return goalsShared;
  }

  async getSharingReceiveByUsername(username: string) {
    const goalsShared = await this.sharingRepository.findBy({
      username_from: username,
    });

    if (!goalsShared) {
      throw new GoalsSharedEmpty();
    }

    return goalsShared;
  }

  async create(sharingDto: CreateSharingDto, user: User) {
    const usernameTo = sharingDto.username_to;
    const usernameFrom = user.username;

    if (usernameTo === usernameFrom) {
      throw new SharingException('Not allowed to share a goal with yourself');
    }
    const userModify = {
      ...sharingDto,
      username_from: user.username,
    };
    return await this.sharingRepository.save(userModify);
  }
}
