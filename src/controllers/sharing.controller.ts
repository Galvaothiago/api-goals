import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateGoalDto } from 'src/entities/goals/dto/create-goal.dto';
import { UpdateGoalDto } from 'src/entities/goals/dto/update-goal.dto';
import { CreateSharingDto } from 'src/entities/sharing/dto/create-sharing.dto';
import { User } from 'src/entities/user/user.entity';
import { SharingService } from 'src/services/sharing.service';
import { generatePassword } from 'src/utils/generatePassword';
import { GoalsService } from '../services/goals.service';

@Controller('sharing')
export class SharingController {
  constructor(private readonly sharingService: SharingService) {}

  @Post('/')
  createGoalShared(
    @CurrentUser() user: User,
    @Body() createSharing: CreateSharingDto,
  ) {
    return this.sharingService.create(createSharing, user);
  }

  @Get('/me')
  getSharedGoalsIssued(@CurrentUser() user: User) {
    return this.sharingService.getSharingIssuedByUsername(user.username);
  }

  @Get('/toMe')
  getSharedGoalsReceive(@CurrentUser() user: User) {
    return this.sharingService.getSharingReceiveByUsername(user.username);
  }

  @Get('/confirm/:id')
  confirmReceipt(@Param('id') id: string) {
    return this.sharingService.checkSharedGoal(id);
  }

  @Delete('/:id')
  deleteGoalShared(@Param('id') id: string) {
    return this.sharingService.deleteGoalShared(id);
  }
}
