import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class ApiHealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const result = this.getStatus('API para busca de usuário ingame', true);

    return result;
  }
}