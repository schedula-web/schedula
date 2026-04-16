import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger {
  private logger = new Logger();

  log(message: string, context?: string) {
    this.logger.log(this.format(message, context));
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(this.format(message, context), trace);
  }

  warn(message: string, context?: string) {
    this.logger.warn(this.format(message, context));
  }

  debug(message: string, context?: string) {
    this.logger.debug(this.format(message, context));
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(this.format(message, context));
  }

  private format(message: string, context?: string) {
    const time = new Date().toISOString();
    return `${time} ${context ? `[${context}]` : ''} ${message}`;
  }
}