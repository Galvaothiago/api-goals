import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoalDto } from 'src/entities/goals/dto/create-goal.dto';
import { UpdateGoalDto } from 'src/entities/goals/dto/update-goal.dto';
import { Goal } from 'src/entities/goals/goal.entity';
import { Repository } from 'typeorm';


@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>
    ){}
  create(createGoalDto: CreateGoalDto) {
    return this.goalRepository.save(createGoalDto);
  }

  findAll() {
    return this.goalRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} goal`;
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }
}
