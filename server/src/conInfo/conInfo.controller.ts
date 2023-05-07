import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { ExceptionHandler } from 'src/common/ExceptionHandler';
import { ConInfoService } from './conInfo.service';
import { PostConInfoDto } from './dto/postInfo.dto';

import { AuthGuard } from 'src/common/authGuard.controller';

@UseFilters(ExceptionHandler)
@Controller('admin/contest')
export class ConInfoController {
  constructor(private readonly conInfoService: ConInfoService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getEntry(@Body() id: string): Promise<any> {
    return await this.conInfoService.getConInfo(id);
  } // 대회 정보를 표시한다.

  @UseGuards(AuthGuard)
  @Post('')
  async createEntry(@Body() dto: PostConInfoDto): Promise<any> {
    return await this.conInfoService.postConInfo(dto);
  } // 대회 정보를 수정한다.
}