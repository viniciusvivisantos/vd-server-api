import * as winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
import { ConfigurationService } from '../config/configuration.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  private logger: winston.Logger;

  constructor(configurationService: ConfigurationService) {
    this.logger = winston.createLogger({
      level: configurationService.loggerLevel,
      format: winston.format.combine(
        winston.format.label({ label: configurationService.loggerLabel }),
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
      ],
    });

    if (configurationService.stackdriveActive) {
      const loggingWinston = new LoggingWinston({
        projectId: configurationService.stackdriveProjectId,
        keyFilename: configurationService.stackdrivePath,
      });

      this.logger.add(loggingWinston);
    }
  }

  log(message: string, metadata: any = {}) {
    this.logger.info(message, metadata);
  }

  error(message: string, metadata: any = {}) {
    this.logger.error(message, metadata);
  }

  warn(message: string, metadata: any = {}) {
    this.logger.warn(message, metadata);
  }

  debug(message: string, metadata: any = {}) {
    this.logger.debug(message, metadata);
  }

  verbose(message: string, metadata: any = {}) {
    this.logger.verbose(message, metadata);
  }
}