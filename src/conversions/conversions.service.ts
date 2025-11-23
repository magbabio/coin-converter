import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConversionHistoryDto } from './dto/conversion-history.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ConversionsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  private async validateCurrencies(
    fromCurrencyId: string,
    toCurrencyId: string,
  ) {
    const [from, to] = await Promise.all([
      this.prisma.currency.findUnique({ where: { id: fromCurrencyId } }),
      this.prisma.currency.findUnique({ where: { id: toCurrencyId } }),
    ]);

    if (!from || !to) {
      throw new NotFoundException('Invalid currency');
    }
  }

  private async getLatestRate(fromCurrencyId: string, toCurrencyId: string) {
    const rate = await this.prisma.exchangeRate.findFirst({
      where: { fromCurrencyId, toCurrencyId },
      orderBy: { timestamp: 'desc' },
    });

    if (!rate) {
      throw new NotFoundException(
        'No exchange rate found for the provided currencies',
      );
    }

    return rate;
  }

  async conversion(
    fromCurrencyId: string,
    toCurrencyId: string,
    amount: number,
  ) {
    await this.validateCurrencies(fromCurrencyId, toCurrencyId);

    const latestRate = await this.getLatestRate(fromCurrencyId, toCurrencyId);
    const convertedAmount = amount * latestRate.rate;

    return {
      message: 'Amount converted successfully',
      data: {
        fromCurrency: fromCurrencyId,
        toCurrency: toCurrencyId,
        rateUsed: latestRate.rate,
        timestamp: latestRate.timestamp,
        convertedAmount,
      },
    };
  }

  async create(dto: ConversionHistoryDto) {
    const { userId, fromCurrencyId, toCurrencyId, amount } = dto;

    await this.usersService.validateUser(userId);
    await this.validateCurrencies(fromCurrencyId, toCurrencyId);

    const latestRate = await this.getLatestRate(fromCurrencyId, toCurrencyId);

    const result = amount * latestRate.rate;

    const history = await this.prisma.conversionHistory.create({
      data: {
        userId,
        fromCurrencyId,
        toCurrencyId,
        amount,
        result,
        rateUsed: latestRate.rate,
      },
    });

    return {
      message: 'Conversion saved successfully',
      data: history,
    };
  }

  async getUserHistory(userId: string) {
    await this.usersService.validateUser(userId);

    const history = await this.prisma.conversionHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        fromCurrency: true,
        toCurrency: true,
      },
    });

    return {
      message: 'User conversion history fetched successfully',
      data: history,
    };
  }
}
