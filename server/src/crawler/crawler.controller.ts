import { Cron } from '@nestjs/schedule';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ExceptionHandler } from '../common/ExceptionHandler';

@UseFilters(ExceptionHandler)
@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Cron('0 00 06 * * *')
  getRanking() {
    return null;
    // return this.crawlerService.crawler();
  } // TODO : 추후에 수정하기

  @Get('nowRank')
  getRankingTest(): any {
    return this.crawlerService.getRanking();
  }
}
