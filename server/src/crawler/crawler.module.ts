import { Logger, Module } from '@nestjs/common';

import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from 'src/common/exceptionHandler';

import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compe } from 'src/compe/entities/compe.entity';
import { Entrant } from 'src/entrant/entities/entrant.entity';
import { ConInfo } from 'src/conInfo/entities/conInfo.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Compe, Entrant, ConInfo]),
  ],
  controllers: [CrawlerController],
  providers: [
    CrawlerService,
    Logger,
    { provide: APP_FILTER, useClass: ExceptionHandler },
  ],
})
export class CrawlerModule {}
