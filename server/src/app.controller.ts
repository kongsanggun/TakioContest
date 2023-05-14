import { Cron } from '@nestjs/schedule';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { ExceptionHandler } from './common/ExceptionHandler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
