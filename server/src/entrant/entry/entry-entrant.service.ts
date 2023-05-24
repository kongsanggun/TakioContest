import { ServiceUnavailableException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entrant } from '../entities/entrant.entity';
import { CreateEntrantDto } from './dto/createEntrant.dto';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entrant)
    private readonly entrantRepository: Repository<Entrant>,
  ) {}

  async createEntrant(dto: CreateEntrantDto) {
    const taikoId = dto.taikoId;
    const entryName = dto.entryName;
    const entrantId = await this.checkId(taikoId);
    const entrantName = await this.checkName(entryName);

    if (entrantName.length > 0) {
      throw new ServiceUnavailableException('참가자 이름이 중복되었습니다.');
    }

    if (entrantId.length > 0) {
      throw new ServiceUnavailableException('북번호가 중복되었습니다.');
    }

    await this.create(dto);
    return 'Done';
  }

  private async checkId(taikoId: string) {
    return await this.entrantRepository
      .createQueryBuilder('score')
      .where('score.taikoId = :taikoId', { taikoId: taikoId })
      .getMany();
  }

  private async checkName(entryName: string) {
    return await this.entrantRepository
      .createQueryBuilder('score')
      .where('score.entryName = :entryName', { entryName: entryName })
      .getMany();
  }

  private async create(dto: CreateEntrantDto) {
    try {
      await this.entrantRepository.save(dto);
    } catch (error) {
      throw new ServiceUnavailableException('생성 중 에러가 발생했습니다.');
    }
  }
}
