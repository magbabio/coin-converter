import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('p2p')
  async getP2P() {
    const ads = await this.binanceService.scrapeP2P();
    return ads.map((ad) => ({
      seller: ad.advertiser.nickName,
      price: `${ad.adv.price} ${ad.adv.fiatUnit}`,
      methods: ad.adv.tradeMethods.map((m) => m.tradeMethodName),
    }));
  }

  @Get('average')
  async getP2PAverage() {
  const average = await this.binanceService.getAverageRate();
  return { average };
}

}
