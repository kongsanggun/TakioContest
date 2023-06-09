import { ServiceUnavailableException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entrant } from '../entities/entrant.entity';
import { UpdateEntrantDto } from './dto/updateEntrant.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Entrant)
    private readonly entrantRepository: Repository<Entrant>,
  ) {}

  // Get : 대회 정보 표시
  async getEntrant() {
    const DB = await this.getAll();
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

  private async getAll() {
    try {
      return await this.entrantRepository
        .createQueryBuilder('score')
        .orderBy({
          'score.taikoId': 'ASC',
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
      const result = (await DB).map((item: any): any => {
        const girdData = {
          taikoId: item.taikoId,
          entryType: item.entryType,
          entryName: item.entryName,
          contacts: item.contacts,
          songScore1: item.songScore1,
          songScore2: item.songScore2,
          songScore3: item.songScore3,
          entryAt: item.entryAt.toISOString().split('T')[0],
          expiredAt: item.expiredAt.toISOString().split('T')[0],
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

  // Post : 대회 정보 수정
  async postEntrant(dto: any) {
    // await this.postInfo(dto); // 추가
    await this.updatePost(dto.updatedRows); // 수정
    await this.deletePost(dto.deletedRows); // 삭제
    return 'Done';
  }

  private async updatePost(updatedRows: any) {
    for (const index of updatedRows) {
      await this.updateEntrant({
        taikoId: index.taikoId,
        entryName: index.entryName,
        contacts: index.contacts,
        entryType: index.entryType,
        songScore1: index.songScore1,
        songScore2: index.songScore2,
        songScore3: index.songScore3,
      });
    }
  }

  private async deletePost(deletedRows: any) {
    try {
      for (const index of deletedRows) {
        const taikoId = index.taikoId;
        await this.entrantRepository
          .createQueryBuilder('entrant')
          .delete()
          .where('taikoId = :taikoId', { taikoId: taikoId })
          .execute();
      }
    } catch (error) {
      throw new ServiceUnavailableException('저장 중 에러가 발생했습니다.');
    }
  }

  private async updateEntrant(dto: UpdateEntrantDto) {
    try {
      const taikoId = dto.taikoId;
      await this.entrantRepository
        .createQueryBuilder('entrant')
        .update('entrant')
        .set(dto)
        .where('taikoId = :taikoId', { taikoId: taikoId })
        .execute();
    } catch (error) {
      throw new ServiceUnavailableException('저장 중 에러가 발생했습니다.');
    }
  }
}
