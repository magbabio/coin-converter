import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BinanceService } from './binance.service';

@Injectable()
export class BinanceCron {
  constructor(private readonly binanceService: BinanceService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    await this.binanceService.saveAverageRate();
    console.log('Average rate succesfully saved');
  }
}
