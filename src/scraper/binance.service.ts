import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { puppeteerConfig } from '../config/puppeteer.config';

@Injectable()
export class BinanceService {
  async scrapeP2P(): Promise<any[]> {
    const browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();

    const url = process.env.BINANCE_P2P_URL!;

    const body = {
      page: 1,
      rows: 5,
      payTypes: [],
      asset: process.env.BINANCE_P2P_ASSET || 'USDT',
      tradeType: process.env.BINANCE_P2P_TRADE_TYPE || 'SELL',
      fiat: process.env.BINANCE_P2P_FIAT || 'VES',
      publisherType: null,
    };

const response = await page.evaluate(async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/plain, */*",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}, url, body);


    await browser.close();
    return response.data;
  }
  
    async getAverageRate(): Promise<number> {
    const ads = await this.scrapeP2P();
    const prices = ads.map((ad) => parseFloat(ad.adv.price));
    const sum = prices.reduce((acc, val) => acc + val, 0);
    return sum / prices.length;
  }
}

