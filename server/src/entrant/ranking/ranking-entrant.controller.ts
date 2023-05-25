import { Controller, Get, UseFilters } from '@nestjs/common';

import { entryType } from 'src/common/enums/entryType';
import { ExceptionHandler } from 'src/common/exceptionHandler';

import { RankingService } from './ranking-entrant.service';

@UseFilters(ExceptionHandler)
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get('origin')
  async getOrigin(): Promise<any> {
    return await this.rankingService.getRanking(entryType.ORIGIN);
  } // 오리지널 모드에 참가한 참가자의 정보를 가져온다.

  @Get('chogosu')
  async getChogosu(): Promise<any> {
    return await this.rankingService.getRanking(entryType.CHO_GO_SU);
  } // 초고수 모드에 참가한 참가자의 정보를 가져온다.
}
