import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

@Injectable()
export class QueueService {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('timetable', {
      connection: new IORedis({
        host: process.env.REDIS_HOST,
      }),
    });
  }
}