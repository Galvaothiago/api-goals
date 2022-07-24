import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'goals' })
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column()
  url_img: string;

  @Column()
  final_amount: number;

  @Column()
  current_amount: number;

  @Column({ default: false })
  is_shared: boolean;

  @CreateDateColumn()
  created_at: Date;
}
