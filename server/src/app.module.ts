import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from './config/authConfig';

import { APP_FILTER } from '@nestjs/core';
import { validate } from './config/env.validation';
import { ExceptionHandler } from './common/ExceptionHandler';

import { CompeModule } from './compe/compe.module';
import { ConInfoModule } from './conInfo/conInfo.module';
import { EntrantModule } from './entrant/entrant.module';
import { AuthModule } from './auth/auth.module';
import { CrawlerModule } from './crawler/crawler.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConInfo } from './conInfo/entities/conInfo.entity';
import { Entrant } from './entrant/entities/entrant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      load: [authConfig],
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CompeModule,
    ConInfoModule,
    EntrantModule,
    CrawlerModule,
    TypeOrmModule.forFeature([ConInfo, Entrant]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    { provide: APP_FILTER, useClass: ExceptionHandler },
  ],
})
export class AppModule {}
