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

  async create(sharingDto: CreateSharingDto, user: User) {
    const usernameTo = sharingDto.username_to;
    const usernameFrom = user.username;

    if (usernameTo === usernameFrom) {
      throw new SharingException('Not allowed to share a goal with yourself');
    }
    const userModified = {
      ...sharingDto,
      username_from: user.username,
    };
    return await this.sharingRepository.save(userModified);
  }

  async getSharingReceiveByUsername(username: string) {
    const goalsShared = await this.sharingRepository.findBy({
      username_to: username,
    });

    if (goalsShared.length === 0) {
      throw new GoalsSharedEmpty();
    }

    return goalsShared;
  }

  async getSharingIssuedByUsername(username: string) {
    const goalsShared = await this.sharingRepository.findBy({
      username_from: username,
    });

    if (goalsShared.length === 0) {
      throw new GoalsSharedEmpty();
    }

    return goalsShared;
  }

  async rejectGoal(id: string) {
    const goalShared = await this.sharingRepository.findBy({ id });

    if (goalShared.length === 0) {
      throw new SharingException('Goal shared not found!');
    }

    const goalSharedUpdated = {
      ...goalShared[0],
      rejectd: true,
      verified_at: new Date(),
    };

    await this.sharingRepository.update(id, goalSharedUpdated);
  }

  async checkSharedGoal(id: string) {
    if (!id) {
      throw new SharingException('id needed to check it!');
    }

    const goalShared = await this.sharingRepository.findBy({ id });

    if (goalShared.length === 0) {
      throw new SharingException('Goal shared not found!');
    }

    const goalSharedUpdated = {
      ...goalShared[0],
      sharing_verify: true,
      verified_at: new Date(),
    };

    await this.sharingRepository.update(id, goalSharedUpdated);
  }

  async deleteGoalShared(id: string) {
    const goalShared = await this.sharingRepository.findBy({ id });

    if (goalShared.length === 0) {
      throw new SharingException('Goal shared not found!');
    }

    await this.sharingRepository.delete(id);
  }
}
