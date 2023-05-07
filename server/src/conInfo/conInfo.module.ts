import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from 'src/common/ExceptionHandler';

import { ConInfo } from './entities/conInfo.entitiy';
import { ConInfoController } from './conInfo.controller';
import { ConInfoService } from './conInfo.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ConInfo])],
  controllers: [ConInfoController],
  providers: [
    Logger,
    { provide: APP_FILTER, useClass: ExceptionHandler },
    ConInfoService,
  ],
  exports: [ConInfoService],
})
export class ConInfoModule {}
