import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { puppeteerConfig } from '../config/puppeteer.config';
import { ExchangeRateService } from 'src/currencies/exchange-rate.service';
import { RateSource } from '@prisma/client';
import { BinanceDto } from './dto/binance-dto';

@Injectable()
export class BinanceService {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  async scrapeP2P(tradeType: 'SELL' | 'BUY'): Promise<any[]> {
    const browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();

    const url = process.env.BINANCE_P2P_URL!;

    const body = {
      page: 1,
      rows: 5,
      payTypes: [],
      asset: process.env.BINANCE_P2P_ASSET || 'USDT',
      tradeType,
      fiat: process.env.BINANCE_P2P_FIAT || 'VES',
      publisherType: null,
    };

    const response = await page.evaluate(
      async (url, body) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
          },
          body: JSON.stringify(body),
        });
        return res.json();
      },
      url,
      body,
    );

    await browser.close();
    return response.data;
  }

  async getAverageRate(): Promise<number> {
    const [sellAds, buyAds] = await Promise.all([
      this.scrapeP2P('SELL'),
      this.scrapeP2P('BUY'),
    ]);

    const allPrices = [...sellAds, ...buyAds].map((ad) =>
      parseFloat(ad.adv.price),
    );
    const sum = allPrices.reduce((acc, val) => acc + val, 0);

    return sum / allPrices.length;
  }

  async saveAverageRate() {
    const average = await this.getAverageRate();

    return this.exchangeRateService.saveRate(
      process.env.BINANCE_P2P_ASSET || 'USDT',
      process.env.BINANCE_P2P_FIAT || 'VES',
      average,
      RateSource.BINANCE,
    );
  }

  async getAllAds(): Promise<BinanceDto[]> {
    const [sellAds, buyAds] = await Promise.all([
      this.scrapeP2P('SELL'),
      this.scrapeP2P('BUY'),
    ]);

    return [
      ...sellAds.map((ad) => new BinanceDto(ad, 'SELL')),
      ...buyAds.map((ad) => new BinanceDto(ad, 'BUY')),
    ];
  }
}
