import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/createEntry.dto';
import { entryType } from 'src/common/enums/entryType';
import { ExceptionHandler } from 'src/common/ExceptionHandler';

@UseFilters(ExceptionHandler)
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Get('')
  async getEntry(): Promise<any> {
    return await this.entryService.getEntry();
  } // 참가자의 정보를 가져온다.

  @Get('origin')
  async getOrigin(): Promise<any> {
    return await this.entryService.getRanking(entryType.ORIGIN);
  } // 오리지널 모드에 참가한 참가자의 정보를 가져온다.

  @Get('chogosu')
  async getChogosu(): Promise<any> {
    return await this.entryService.getRanking(entryType.CHO_GO_SU);
  } // 초고수 모드에 참가한 참가자의 정보를 가져온다.

  @Post('create')
  async createEntry(@Body() dto: CreateEntryDto): Promise<any> {
    await this.entryService.createEntry(dto);
    return 'Done!';
  } // 참가자를 등록한다.
}
