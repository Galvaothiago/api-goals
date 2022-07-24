import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoalDto } from 'src/entities/goals/dto/create-goal.dto';
import { UpdateGoalDto } from 'src/entities/goals/dto/update-goal.dto';
import { Goal } from 'src/entities/goals/goal.entity';
import { generateCodeInvite } from 'src/utils/generateCodeInvite';
import { Repository } from 'typeorm';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
  ) {}
  async create(createGoalDto: CreateGoalDto) {
    return await this.goalRepository.save(createGoalDto);
  }

  async findAll(userId: string) {
    return await this.goalRepository.findBy({ user_id: userId });
  }

  async findOne(id: string) {
    const goal = await this.goalRepository.findOneBy({ id });

    const messageNotFound = {
      status: 404,
      message: 'Goals not found!',
    };

    if (!goal) {
      return messageNotFound;
    }
    return this.goalRepository.findOneBy({ id });
  }

  async update(id: string, updateGoalDto: UpdateGoalDto) {
    return await this.goalRepository.update(id, updateGoalDto);
  }

  async remove(id: string) {
    return await this.goalRepository.delete(id);
  }

  async changeStatusShared(id: string) {
    const goalToUpdate = await this.goalRepository.findOneBy({ id });
    const { is_shared } = goalToUpdate;

    await this.goalRepository.update(id, {
      is_shared: !is_shared,
    });
  }

  async increaseCurrentValue(id: string, money: number) {
    const goalToUpdate = await this.goalRepository.findOneBy({ id });

    const { current_value } = goalToUpdate;

    const goalUpadted = {
      ...goalToUpdate,
      current_value: Number((current_value + money).toFixed(2)),
    };

    return await this.goalRepository.update(id, goalUpadted);
  }
}
