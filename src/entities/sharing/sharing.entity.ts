import { MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sharing_goal')
export class Sharing {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    goal_shared: string

    @Column()
    username_from: string

    @Column()
    username_to: string

    @Column({ default: false})
    sharing_verify: boolean

    @Column()
    verified_at: Date
}