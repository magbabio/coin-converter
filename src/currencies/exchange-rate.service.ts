import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RateSource } from '@prisma/client';

@Injectable()
export class ExchangeRateService {
  constructor(private readonly prisma: PrismaService) {}

  async saveRate(fromCode: string, toCode: string, rate: number, source: RateSource) {
    const fromCurrency = await this.prisma.currency.findUnique({ where: { code: fromCode } });
    const toCurrency = await this.prisma.currency.findUnique({ where: { code: toCode } });

    if (!fromCurrency || !toCurrency) throw new Error('Currency not found');

    return this.prisma.exchangeRate.create({
      data: {
        fromCurrencyId: fromCurrency.id,
        toCurrencyId: toCurrency.id,
        rate,
        source,
      },
    });
  }

  async getLatestRate(fromCode: string, toCode: string, source?: RateSource) {
    return this.prisma.exchangeRate.findFirst({
      where: {
        fromCurrency: { code: fromCode },
        toCurrency: { code: toCode },
        ...(source ? { source } : {}),
      },
      orderBy: { timestamp: 'desc' },
    });
  }
}
