import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class UserInvites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  lastCode: string;

  @Column()
  invites: number;
}
