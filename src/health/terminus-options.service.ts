import {
    TerminusEndpoint,
    TerminusOptionsFactory,
    TerminusModuleOptions
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { ApiHealthIndicator } from './health.entity';
@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
    constructor(
        private readonly apiHealthIndicator: ApiHealthIndicator
    ) { }
    createTerminusOptions(): TerminusModuleOptions {
        const healthEndpoint: TerminusEndpoint = {
            url: 'api/health',
            healthIndicators: [
                async () => this.apiHealthIndicator.isHealthy()
            ],
        };
        const healthTeresaEndpoint: TerminusEndpoint = {
            url: '/',
            healthIndicators: [
                async () => this.apiHealthIndicator.isHealthy()
            ],
        };
        return {
            endpoints: [healthEndpoint, healthTeresaEndpoint],
        };
    }
}