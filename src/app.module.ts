import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalsModule } from './modules/goals/goals.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '091041212',
      database: 'NEST',
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
    }
  ), GoalsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
