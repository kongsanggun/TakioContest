import { Cron } from '@nestjs/schedule';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ExceptionHandler } from '../common/exceptionHandler';

@UseFilters(ExceptionHandler)
@Controller('api/crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  // TODO : Cron 갱신이 되지 않음
  @Cron('0 0 9 * * *')
  getRanking() {
    return this.crawlerService.crawler();
  } // 히로바에서 점수 데이터 가져와서 갱신하기

  @Cron('0 0 21 * * *')
  getRanking2() {
    return this.crawlerService.crawler();
  } // 히로바에서 점수 데이터 가져와서 갱신하기
}
