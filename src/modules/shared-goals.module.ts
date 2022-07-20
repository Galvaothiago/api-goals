import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharingController } from 'src/controllers/sharing.controller';
import { Sharing } from 'src/entities/sharing/sharing.entity';
import { SharingService } from 'src/services/sharing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sharing])],
  controllers: [SharingController],
  providers: [SharingService],
  exports: [SharingService],
})
export class SharedModule {}
