import { Module } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { BinanceController } from './binance.controller';
import { BinanceCron } from './binance.cron';
import { ExchangeRateModule } from 'src/currencies/exchange-rate.module';

@Module({
  imports: [ExchangeRateModule],
  providers: [BinanceService, BinanceCron],
  controllers: [BinanceController],
})
export class BinanceModule {}
