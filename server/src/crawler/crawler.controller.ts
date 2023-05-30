import { Cron } from '@nestjs/schedule';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ExceptionHandler } from '../common/exceptionHandler';

@UseFilters(ExceptionHandler)
@Controller('api/crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Cron('0 0 6 * * *', {
    name: 'getRankingAM',
    timeZone: 'Asia/Seoul',
  })
  getRankingAM() {
    return this.crawlerService.crawler();
  } // 히로바에서 점수 데이터 가져와서 갱신하기

  @Cron('0 0 18 * * *', {
    name: 'getRankingPM',
    timeZone: 'Asia/Seoul',
  })
  getRankingPM() {
    return this.crawlerService.crawler();
  } // 히로바에서 점수 데이터 가져와서 갱신하기
}
