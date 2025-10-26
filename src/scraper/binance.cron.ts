import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BinanceService } from './binance.service';

@Injectable()
export class BinanceCron {
  constructor(private readonly binanceService: BinanceService) {}

  @Cron(CronExpression.EVERY_DAY_AT_8PM)
  async handleCron() {
    await this.binanceService.saveAverageRate();
  }
}
