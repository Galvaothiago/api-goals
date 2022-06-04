import { IsInt, IsNotEmpty, IsNumberString } from "class-validator"
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm"

export class CreateGoalDto {
    @IsNotEmpty()
    title: string

    url_img: string

    @IsInt()
    final_value: number

    @IsInt()
    current_value: number

    @IsNotEmpty()
    share_id: string
}
