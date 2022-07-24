import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalsModule } from './modules/goals.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';
import { SharedModule } from './modules/shared-goals.module';
import { InviteModule } from './modules/invite.module';

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
    SharedModule,
    InviteModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
