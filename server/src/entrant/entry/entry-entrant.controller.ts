import { Body, Controller, Post, UseFilters } from '@nestjs/common';

import { ExceptionHandler } from 'src/common/ExceptionHandler';

import { CreateEntrantDto } from './dto/createEntrant.dto';
import { EntryService } from './entry-entrant.service';

@UseFilters(ExceptionHandler)
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post('create')
  async createEntry(@Body() dto: CreateEntrantDto): Promise<any> {
    return await this.entryService.createEntrant(dto);
  } // 참가자를 등록한다.
}
