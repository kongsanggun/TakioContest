import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from 'src/common/exceptionHandler';

import { Entrant } from './entities/entrant.entity';

import { AdminController } from './admin/admin-entrant.controller';
import { EntryController } from './entry/entry-entrant.controller';
import { RankingController } from './ranking/ranking-entrant.controller';

import { AdminService } from './admin/admin-entrant.service';
import { EntryService } from './entry/entry-entrant.service';
import { RankingService } from './ranking/ranking-entrant.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Entrant])],
  controllers: [AdminController, EntryController, RankingController],
  providers: [
    Logger,
    { provide: APP_FILTER, useClass: ExceptionHandler },
    AdminService,
    EntryService,
    RankingService,
  ],
})
export class EntrantModule {}
