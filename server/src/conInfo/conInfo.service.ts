import { ServiceUnavailableException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConInfo } from './entities/conInfo.entitiy';
import { PostConInfoDto } from './dto/postInfo.dto';

@Injectable()
export class ConInfoService {
  constructor(
    @InjectRepository(ConInfo)
    private readonly ConInfoRepository: Repository<ConInfo>,
  ) {}

  // Get : 대회 정보 표시
  async getConInfo(id: string) {
    return await this.getInfo(id);
  }

  private async getInfo(id: string) {
    try {
      return await this.ConInfoRepository.createQueryBuilder('info')
        .where('info.Id = :Id', { Id: id })
        .getOneOrFail();
    } catch (error) {
      throw new ServiceUnavailableException('대회의 정보를 찾을 수 없습니다.');
    }
  }

  // Post : 대회 정보 수정

  async postConInfo(dto: PostConInfoDto) {
    await this.postInfo(dto);
    return 'Done';
  }

  private async postInfo(dto: PostConInfoDto) {
    try {
      const id = dto.Id;
      await this.ConInfoRepository.createQueryBuilder('info')
        .update('info')
        .set(dto)
        .where('id = :id', { id: id })
        .execute();
    } catch (error) {
      throw new ServiceUnavailableException('생성 중 에러가 발생했습니다.');
    }
  }
}
