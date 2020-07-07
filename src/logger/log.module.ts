import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { ConfigurationModule } from '../config/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [LogService],
  exports: [LogService]
})
export class LogModule { }
