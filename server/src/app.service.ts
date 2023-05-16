import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import puppeteer, { executablePath } from 'puppeteer-core';
import { Repository } from 'typeorm';
import { ConInfo } from './conInfo/entities/conInfo.entity';
import { Entrant } from './entrant/entities/entrant.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ConInfo)
    private readonly ConInfoRepository: Repository<ConInfo>,
    @InjectRepository(Entrant)
    private readonly entrantRepository: Repository<Entrant>,
  ) {}

  async getIndex() {
    const conInfo = await this.ConInfo();
    const entrant = await this.Entrant();

    const result = await this.convert(conInfo, entrant);
    return result;
  }

  private async convert(conInfo: any[], entrant: any[]) {
    const result = {
      start: conInfo[0].entry_at,
      end: conInfo[0].expired_at,
      count: entrant[0].count,
    };
    return result;
  }

  private async ConInfo() {
    try {
      return await this.ConInfoRepository.createQueryBuilder('info')
        .select('*')
        .where('Id = :Id', { Id: process.env.CONTEST_ID })
        .getRawMany();
    } catch (error) {
      throw new ServiceUnavailableException('대회의 정보를 찾을 수 없습니다.');
    }
  }

  private async Entrant() {
    try {
      return await this.entrantRepository
        .createQueryBuilder('score')
        .select('COUNT(score.taikoId) AS count')
        .where(
          '((score.songScore1 <> 0 AND score.songScore1 IS NOT NULL) OR (score.songScore2 <> 0 AND score.songScore2 IS NOT NULL) OR (score.songScore3 <> 0 AND score.songScore3 IS NOT NULL))',
        )
        .getRawMany();
    } catch (error) {
      throw new ServiceUnavailableException('대회의 정보를 찾을 수 없습니다.');
    }
  }
}
