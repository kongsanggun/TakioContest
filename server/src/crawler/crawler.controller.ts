import { Cron } from '@nestjs/schedule';
import { Controller, UseFilters } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ExceptionHandler } from '../common/ExceptionHandler';

@UseFilters(ExceptionHandler)
@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Cron('0 00 06 * * *')
  getRanking() {
    return this.crawlerService.crawler();
  } // 히로바에서 점수 데이터 가져와서 갱신하기
}
