import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalsModule } from './modules/goals.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('TYPE_ORM_DB_HOST', 'localhost'),
        port: Number(configService.get('TYPE_ORM_DB_PORT', 3306)),
        username: configService.get('TYPE_ORM_DB_USERNAME', 'root'),
        password: configService.get('TYPE_ORM_DB_PASSWORD', '091041212'),
        database: configService.get('TYPE_ORM_DB_DATABASE', 'NEST'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
      }),
    }),
    GoalsModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
