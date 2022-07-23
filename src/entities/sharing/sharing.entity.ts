import { MaxLength, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sharing_goal' })
export class Sharing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  goal_shared: string;

  @Column()
  username_from: string;

  @Column()
  username_to: string;

  @Column({ default: false })
  sharing_verify: boolean;

  @Column({ default: false })
  rejected: boolean;

  @Column({ default: null })
  verified_at: Date;
}
