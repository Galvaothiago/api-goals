import { Module } from '@nestjs/common';
import { GoalsService } from '../services/goals.service';
import { GoalsController } from '../controllers/goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from '../entities/goals/goal.entity';
import { SharingService } from 'src/services/sharing.service';
import { SharedModule } from './shared-goals.module';
import { Invite } from 'src/entities/invite/invite.entity';
import { InviteService } from 'src/services/invite.service';
import { InviteController } from 'src/controllers/invite.controller';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invite]), UserModule],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
