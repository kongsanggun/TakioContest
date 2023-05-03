import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Entry } from './entities/entry.entity';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from 'src/common/ExceptionHandler';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntryController],
  providers: [
    Logger,
    { provide: APP_FILTER, useClass: ExceptionHandler },
    EntryService,
  ],
  exports: [EntryService],
})
export class EntryModule {}
