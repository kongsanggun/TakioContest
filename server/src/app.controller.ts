import { Cron } from '@nestjs/schedule';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { ExceptionHandler } from './common/ExceptionHandler';

@UseFilters(ExceptionHandler)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Cron('0 00 06 * * *')
  getRanking() {
    return this.appService.getRanking();
  } // TODO : 추후에 수정하기

  @Get('nowRank')
  getRankingTest(): any {
    return this.appService.getRanking();
  }

  @Get('searchUser')
  searchUser(): any {
    return this.appService.searchUser();
  }
}
