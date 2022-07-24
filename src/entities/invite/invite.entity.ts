import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'invite_user' })
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  invite_code: string;

  @Column()
  issued_by: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: null })
  consumed_by: string;

  @Column({ default: null })
  checked_at: Date;

  @Column({ default: false })
  code_used: boolean;
}
