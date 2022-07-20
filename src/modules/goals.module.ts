import { Module } from '@nestjs/common';
import { GoalsService } from '../services/goals.service';
import { GoalsController } from '../controllers/goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from '../entities/goals/goal.entity';
import { SharingService } from 'src/services/sharing.service';
import { SharedModule } from './shared-goals.module';

@Module({
  imports: [TypeOrmModule.forFeature([Goal]), SharedModule],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
