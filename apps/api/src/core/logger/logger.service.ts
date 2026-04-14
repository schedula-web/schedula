import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, context?: string) {
    console.log(`[LOG] ${this.format(message, context)}`);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(`[ERROR] ${this.format(message, context)}`);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: string, context?: string) {
    console.warn(`[WARN] ${this.format(message, context)}`);
  }

  debug(message: string, context?: string) {
    console.debug(`[DEBUG] ${this.format(message, context)}`);
  }

  verbose(message: string, context?: string) {
    console.info(`[VERBOSE] ${this.format(message, context)}`);
  }

  private format(message: string, context?: string) {
    const time = new Date().toISOString();
    return `${time} ${context ? `[${context}]` : ''} ${message}`;
  }
}