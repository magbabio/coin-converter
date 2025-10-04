import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { BinanceDto } from './dto/binance-dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('p2p')
  async getP2P() {
    const ads = await this.binanceService.scrapeP2P();
    return ads.map((ad) => new BinanceDto(ad));
  }

  @Get('average')
  async getP2PAverage() {
    const average = await this.binanceService.getAverageRate();
    return { average };
  }
}
