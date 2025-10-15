import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteCurrencyDto } from './dto/create-favorite-currency.dto';

@Injectable()
export class FavoriteCurrenciesService {
  constructor(private prisma: PrismaService) {}

  async create(createFavoriteCurrencyDto: CreateFavoriteCurrencyDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createFavoriteCurrencyDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currency = await this.prisma.currency.findUnique({
      where: { id: createFavoriteCurrencyDto.currencyId },
    });

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    const existingFavorite = await this.prisma.favoriteCurrency.findUnique({
      where: {
        userId_currencyId: {
          userId: createFavoriteCurrencyDto.userId,
          currencyId: createFavoriteCurrencyDto.currencyId,
        },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Currency is already in favorites');
    }

    return this.prisma.favoriteCurrency.create({
      data: createFavoriteCurrencyDto,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        currency: true,
      },
    });
  }

  async findAll() {
    return this.prisma.favoriteCurrency.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        currency: true,
      },
    });
  }

  async findByUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.favoriteCurrency.findMany({
      where: { userId },
      include: {
        currency: true,
      },
    });
  }

  async findOne(id: string) {
    const favoriteCurrency = await this.prisma.favoriteCurrency.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        currency: true,
      },
    });

    if (!favoriteCurrency) {
      throw new NotFoundException('Favorite currency not found');
    }

    return favoriteCurrency;
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.favoriteCurrency.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        currency: true,
      },
    });
  }

  async removeByUserAndCurrency(userId: string, currencyId: string) {
    const favoriteCurrency = await this.prisma.favoriteCurrency.findUnique({
      where: {
        userId_currencyId: {
          userId,
          currencyId,
        },
      },
    });

    if (!favoriteCurrency) {
      throw new NotFoundException('Favorite currency not found');
    }

    return this.prisma.favoriteCurrency.delete({
      where: {
        userId_currencyId: {
          userId,
          currencyId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        currency: true,
      },
    });
  }
}
