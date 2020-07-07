import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity';
import { HistoryCrudService } from './history-crud.service';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { LogModule } from '../logger/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([History]), HttpModule, LogModule],
  providers: [HistoryCrudService, HistoryService],
  controllers: [HistoryController],
  exports:[HistoryService]
})
export class HistoryModule { }
