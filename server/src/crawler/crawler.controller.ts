import { Cron } from '@nestjs/schedule';
import { Controller, UseFilters } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ExceptionHandler } from '../common/exceptionHandler';

@UseFilters(ExceptionHandler)
@Controller('api/crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Cron('0 0 8 * * *', {
    name: 'getRankingAM',
    timeZone: 'Asia/Seoul',
  })
  getRanking() {
    return this.crawlerService.crawler();
  } // 히로바에서 점수 데이터 가져와서 갱신하기
}
