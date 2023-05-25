import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { ExceptionHandler } from 'src/common/exceptionHandler';
import { CompeService } from './compe.service';

import { AuthGuard } from 'src/common/authGuard.controller';

@UseFilters(ExceptionHandler)
@Controller('api/admin/raking')
export class CompeController {
  constructor(private readonly compeService: CompeService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getEntry(): Promise<any> {
    return await this.compeService.getCompe();
  } // 대회 정보를 표시한다.

  @UseGuards(AuthGuard)
  @Post('')
  async createEntry(@Body() dto: any): Promise<any> {
    return await this.compeService.postCompe(dto);
  } // 대회 정보를 수정한다.
}
