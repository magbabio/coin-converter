import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency, ResponseWithMessage } from './interfaces/currencies.interfaces';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<ResponseWithMessage<Currency>> {
    const existingCurrency = await this.prisma.currency.findUnique({
      where: { code: createCurrencyDto.code },
    });

    if (existingCurrency) {
      throw new ConflictException('Currency with this code already exists');
    }

    const currency = await this.prisma.currency.create({
      data: createCurrencyDto,
      select: {
        id: true,
        name: true,
        code: true,
        symbol: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: 'Currency created successfully',
      data: currency,
    };
  }

  async findAll(): Promise<ResponseWithMessage<Currency[]>> {
    const currencies = await this.prisma.currency.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        symbol: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: 'Currencies retrieved successfully',
      data: currencies,
    };
  }

  async findOne(code: string): Promise<ResponseWithMessage<Currency>> {
    const currency = await this.prisma.currency.findUnique({
      where: { code },
      select: {
        id: true,
        name: true,
        code: true,
        symbol: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    return {
      message: 'Currency retrieved successfully',
      data: currency,
    };
  }

  async findByCode(code: string): Promise<Currency | null> {
    return this.prisma.currency.findUnique({
      where: { code },
    });
  }

  async update(code: string, updateCurrencyDto: UpdateCurrencyDto): Promise<ResponseWithMessage<Currency>> {
    const existingCurrency = await this.prisma.currency.findUnique({ where: { code } });

    if (!existingCurrency) {
      throw new NotFoundException('Currency not found');
    }

    if (updateCurrencyDto.code && updateCurrencyDto.code !== code) {
      const duplicate = await this.prisma.currency.findUnique({
        where: { code: updateCurrencyDto.code },
      });

      if (duplicate) {
        throw new ConflictException('Currency with this code already exists');
      }
    }

    const updatedCurrency = await this.prisma.currency.update({
      where: { code },
      data: updateCurrencyDto,
      select: {
        id: true,
        name: true,
        code: true,
        symbol: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: 'Currency updated successfully',
      data: updatedCurrency,
    };
  }

  async remove(code: string): Promise<ResponseWithMessage<Currency>> {
    const currency = await this.prisma.currency.findUnique({ where: { code } });

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    const deletedCurrency = await this.prisma.currency.delete({
      where: { code },
      select: {
        id: true,
        name: true,
        code: true,
        symbol: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: 'Currency deleted successfully',
      data: deletedCurrency,
    };
  }
}
