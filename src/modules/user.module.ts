import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "src/controllers/auth.controller";
import { User } from "src/entities/user/user.entity";
import { UserService } from "src/services/user.service";

@Module({
   imports: [TypeOrmModule.forFeature([User])],
   controllers: [AuthController],
   providers: [UserService]
}
)
export class UserModule {}