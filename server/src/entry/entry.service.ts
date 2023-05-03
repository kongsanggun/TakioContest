import { ServiceUnavailableException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entry } from './entities/entry.entity';
import { CreateEntryDto } from './dto/createEntry.dto';
import { entryType } from 'src/common/enums/entryType';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  async createEntry(dto: CreateEntryDto) {
    const taikoId = dto.taikoId;

    if ((await this.checkEntry(taikoId)).length > 0) {
      throw new ServiceUnavailableException('태고 아이디가 중복되었습니다.');
    }

    try {
      await this.entryRepository.save(dto);
      await this.initEntry(taikoId);
    } catch (error) {
      throw new ServiceUnavailableException('생성 중 에러가 발생했습니다.');
    }

    return 'Done';
  }

  private async checkEntry(taikoId: string) {
    return await this.entryRepository
      .createQueryBuilder('score')
      .where('score.taikoId = :taikoId', { taikoId: taikoId })
      .getMany();
  }

  private async initEntry(taikoId: string) {
    await this.entryRepository
      .createQueryBuilder()
      .update(Entry)
      .set({
        songScore1: 0,
        songScore2: 0,
        songScore3: 0,
      })
      .where('taikoId = :taikoId', { taikoId: taikoId })
      .execute();
  }

  async getEntry() {
    return await this.entryRepository.find();
  }

  async getRanking(entryType: entryType) {
    const DB = await this.getRank(entryType);
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
    };
  }

  private async convert(DB: Entry[]) {
    const result = (await DB).map((item: any, index: number): any => {
      const Url = `<img height=50 width=50 src='https://img.taiko-p.jp/imgsrc.php?v=&kind=mydon&fn=mydon_${item.taikoId}'>`;
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
  }

  private async getRank(entryType: entryType) {
    return await this.entryRepository
      .createQueryBuilder('score')
      .select('score.taikoId')
      .addSelect('score.entryName')
      .addSelect('score.songScore1')
      .addSelect('score.songScore2')
      .addSelect('score.songScore3')
      .where('score.entryType = :entryType', { entryType: entryType })
      .andWhere(
        '(score.songScore1 <> 0 OR score.songScore2 <> 0 OR score.songScore3 <> 0)',
      )
      .orderBy({
        'score.songScore1 + score.songScore2 + score.songScore3': 'DESC',
      })
      .getMany();
  }
}
