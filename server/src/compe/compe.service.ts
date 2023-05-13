import { ServiceUnavailableException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Compe } from './entities/compe.entity';
import { UpdateCompeDto } from './dto/updateCompe.dto';

@Injectable()
export class CompeService {
  constructor(
    @InjectRepository(Compe)
    private readonly compeRepository: Repository<Compe>,
  ) {}

  // Get : 정보 표시
  async getCompe() {
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
      return await this.compeRepository
        .createQueryBuilder('compe')
        .orderBy({
          'compe.compeId': 'ASC',
        })
        .getMany();
    } catch (error) {
      throw new ServiceUnavailableException(
        '정보를 불러오는 도중 오류가 발생했습니다.',
      );
    }
  }

  private async convert(DB: Compe[]) {
    try {
      const result = DB.map((item: any): any => {
        const girdData = {
          compeId: item.compeId,
          entryType: item.entryType,
          hostName: item.hostName,
          hostTaikoId: item.hostTaikoId,
          startAt: item.startAt.toISOString().split('T')[0],
          endAt: item.endAt.toISOString().split('T')[0],
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

  // Post : 정보 수정

  async postCompe(dto: any) {
    await this.createPost(dto.createdRows); // 추가
    await this.updatePost(dto.updatedRows); // 수정
    await this.deletePost(dto.deletedRows); // 삭제
    return 'Done';
  }

  private async createPost(createdRows: any) {
    for (const index of createdRows) {
      await this.createInfo({
        compeId: index.compeId,
        entryType: index.entryType,
        hostName: index.hostName,
        hostTaikoId: index.hostTaikoId,
        startAt: new Date(index.startAt),
        endAt: new Date(index.endAt),
      });
    }
  }

  private async createInfo(dto: UpdateCompeDto) {
    try {
      await this.compeRepository.save(dto);
    } catch (error) {
      throw new ServiceUnavailableException('생성 중 에러가 발생했습니다.');
    }
  }

  private async updatePost(updatedRows: any) {
    for (const index of updatedRows) {
      await this.updateInfo({
        compeId: index.compeId,
        entryType: index.entryType,
        hostName: index.hostName,
        hostTaikoId: index.hostTaikoId,
        startAt: new Date(index.startAt),
        endAt: new Date(index.endAt),
      });
    }
  }

  private async updateInfo(dto: UpdateCompeDto) {
    try {
      const compeId = dto.compeId;
      await this.compeRepository
        .createQueryBuilder('compe')
        .update('compe')
        .set(dto)
        .where('compeId = :compeId', { compeId: compeId })
        .execute();
    } catch (error) {
      throw new ServiceUnavailableException('생성 중 에러가 발생했습니다.');
    }
  }

  private async deletePost(deletedRows: any) {
    try {
      for (const index of deletedRows) {
        const compeId = index.compeId;
        await this.compeRepository
          .createQueryBuilder('entrant')
          .delete()
          .where('compeId = :compeId', { compeId: compeId })
          .execute();
      }
    } catch (error) {
      throw new ServiceUnavailableException('저장 중 에러가 발생했습니다.');
    }
  }
}
