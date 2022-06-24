import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class InviteCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  generatedBy: string;

  @Column()
  code: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: true })
  code_used: boolean;
}
