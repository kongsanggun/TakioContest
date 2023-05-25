import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { ExceptionHandler } from './common/exceptionHandler';

@UseFilters(ExceptionHandler)
@Controller('index')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  async getIndex() {
    return await this.appService.getIndex();
  } // 인덱스
}
