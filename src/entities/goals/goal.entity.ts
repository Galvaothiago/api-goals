import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'goals' })
export class Goal {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column()
    title: string

    @Column()
    url_img: string

    @Column()
    final_value: number

    @Column()
    current_value: number

    @Column({ default: false })
    is_shared: boolean

    @Column({ default: null })
    share_id: string

    @CreateDateColumn()
    created_at: Date

}
