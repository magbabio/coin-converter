import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const existingCurrency = await this.prisma.currency.findUnique({
      where: { code: createCurrencyDto.code },
    });

    if (existingCurrency) {
      throw new ConflictException('Currency with this code already exists');
    }

    return this.prisma.currency.create({
      data: createCurrencyDto,
    });
  }

  async findAll() {
    return this.prisma.currency.findMany();
  }

  async findOne(code: string) {
    const currency = await this.prisma.currency.findUnique({
      where: { code },
    });

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    return currency;
  }

  async findByCode(code: string) {
    return this.prisma.currency.findUnique({
      where: { code },
    });
  }


  async update(code: string, updateCurrencyDto: UpdateCurrencyDto) {
    await this.findOne(code);

    if (updateCurrencyDto.code && updateCurrencyDto.code !== code) {
      const existingCurrency = await this.prisma.currency.findUnique({
        where: { code: updateCurrencyDto.code },
      });

      if (existingCurrency) {
        throw new ConflictException('Currency with this code already exists');
      }
    }

    return this.prisma.currency.update({
      where: { code },
      data: updateCurrencyDto,
    });
  }

  async remove(code: string) {
    await this.findOne(code);

    return this.prisma.currency.delete({
      where: { code },
    });
  }
} 