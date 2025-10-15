import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { BinanceDto } from './dto/binance-dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('p2p')
  async getP2P() {
    const [sellAds, buyAds] = await Promise.all([
      this.binanceService.scrapeP2P('SELL'),
      this.binanceService.scrapeP2P('BUY'),
    ]);

    const allAds = [
      ...sellAds.map((ad) => new BinanceDto(ad, 'SELL')),
      ...buyAds.map((ad) => new BinanceDto(ad, 'BUY')),
    ];

    return allAds;
  }

  @Get('average')
  async getP2PAverage() {
    const average = await this.binanceService.getAverageRate();
    return { average };
  }
}
