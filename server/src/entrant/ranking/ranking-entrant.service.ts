import { ServiceUnavailableException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entrant } from '../entities/entrant.entity';
import { entryType } from 'src/common/enums/entryType';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Entrant)
    private readonly entrantRepository: Repository<Entrant>,
  ) {}

  async getRanking(entryType: entryType) {
    const DB = await this.get(entryType);
    const result = await this.convert(DB);

    return {
      result: true,
      data: {
        contents: result,
        pagination: {
          page: 1,
          totalCount: 100,
        },
      },
    }; // 그리드 연결 용
  }

  private async get(entryType: entryType) {
    try {
      return await this.entrantRepository
        .createQueryBuilder('score')
        .select('score.taikoId')
        .addSelect('score.entryName')
        .addSelect('score.songScore1')
        .addSelect('score.songScore2')
        .addSelect('score.songScore3')
        .where('score.entryType = :entryType', { entryType: entryType })
        .andWhere(
          '((score.songScore1 <> 0 AND score.songScore1 IS NOT NULL) OR (score.songScore2 <> 0 AND score.songScore2 IS NOT NULL) OR (score.songScore3 <> 0 AND score.songScore3 IS NOT NULL))',
        )
        .orderBy({
          'score.songScore1 + score.songScore2 + score.songScore3': 'DESC',
        })
        .getMany();
    } catch (error) {
      throw new ServiceUnavailableException(
        '랭킹을 불러오는 도중 오류가 발생했습니다.',
      );
    }
  }

  private async convert(DB: Entrant[]) {
    try {
      const result = (await DB).map((item: any, index: number): any => {
        const Url = `<img height=50 width=50 src='https://img.taiko-p.jp/imgsrc.php?fn=mydon_${item.taikoId}'>`;
        const Total = item.songScore1 + item.songScore2 + item.songScore3;
        const girdData = {
          ranking: index + 1,
          entryName: item.entryName,
          takioImg: Url,
          songTotal: Total,
          songScore1: item.songScore1,
          songScore2: item.songScore2,
          songScore3: item.songScore3,
        };

        return girdData;
      });

      return result;
    } catch (error) {
      throw new ServiceUnavailableException(
        '랭킹을 불러오는 도중 오류가 발생했습니다.',
      );
    }
  }
}
