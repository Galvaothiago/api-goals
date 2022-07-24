import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateGoalDto } from 'src/entities/goals/dto/create-goal.dto';
import { UpdateGoalDto } from 'src/entities/goals/dto/update-goal.dto';
import { User } from 'src/entities/user/user.entity';
import { SharingService } from 'src/services/sharing.service';
import { GoalsService } from '../services/goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto);
  }

  @Get('/')
  findAll(@CurrentUser() { id }: User) {
    return this.goalsService.findAll(id);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(id, updateGoalDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.goalsService.remove(id);
  }

  @Put('/share/:id')
  updateShare(@Param('id') id: string) {
    return this.goalsService.changeStatusShared(id);
  }
}
