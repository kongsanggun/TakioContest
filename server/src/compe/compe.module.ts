import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from 'src/common/exceptionHandler';

import { Compe } from './entities/compe.entity';
import { CompeController } from './compe.controller';
import { CompeService } from './compe.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Compe])],
  controllers: [CompeController],
  providers: [
    Logger,
    { provide: APP_FILTER, useClass: ExceptionHandler },
    CompeService,
  ],
  exports: [CompeService],
})
export class CompeModule {}
