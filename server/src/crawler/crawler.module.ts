import { Logger, Module } from '@nestjs/common';

import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from 'src/common/ExceptionHandler';

@Module({
  imports: [],
  controllers: [CrawlerController],
  providers: [
    CrawlerService,
    Logger,
    { provide: APP_FILTER, useClass: ExceptionHandler },
  ],
})
export class CrawlerModule {}
