import { Module } from '@nestjs/common';
import { ApiHealthIndicator } from './health.entity';

@Module({
  providers: [ApiHealthIndicator],
  exports: [ApiHealthIndicator]
})
export class HealthModule {}
