import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { ExceptionHandler } from 'src/common/exceptionHandler';

import { AdminService } from './admin-entrant.service';

import { AuthGuard } from 'src/common/authGuard.controller';

@UseFilters(ExceptionHandler)
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard)
  @Get('entry')
  async getEntry(): Promise<any> {
    return await this.adminService.getEntrant();
  } // 참가자의 정보를 가져온다.

  @UseGuards(AuthGuard)
  @Post('entry')
  async updateEntry(@Body() dto: any): Promise<any> {
    return await this.adminService.postEntrant(dto);
  } // 참가자의 정보를 수정한다.
}
