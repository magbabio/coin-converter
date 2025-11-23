import { Test, TestingModule } from '@nestjs/testing';
import { ConversionsService } from './conversions.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { NotFoundException } from '@nestjs/common';

describe('ConversionsService', () => {
  let service: ConversionsService;

  const prismaMock = {
    currency: {
      findUnique: jest.fn(),
    },
    exchangeRate: {
      findFirst: jest.fn(),
    },
    conversionHistory: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const usersServiceMock = {
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversionsService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    service = module.get<ConversionsService>(ConversionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('conversion()', () => {
    it('should convert the amount successfully', async () => {
      prismaMock.currency.findUnique.mockResolvedValueOnce({ id: 'USD' });
      prismaMock.currency.findUnique.mockResolvedValueOnce({ id: 'EUR' });

      prismaMock.exchangeRate.findFirst.mockResolvedValue({
        rate: 2,
        timestamp: new Date(),
      });

      const result = await service.conversion('USD', 'EUR', 10);

      expect(result.data.convertedAmount).toBe(20);
    });

    it('should throw if currencies are invalid', async () => {
      prismaMock.currency.findUnique.mockResolvedValue(null);

      await expect(service.conversion('INVALID', 'EUR', 10)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create()', () => {
    it('should save conversion successfully', async () => {
      usersServiceMock.validateUser.mockResolvedValue({ id: 'USER1' });

      prismaMock.currency.findUnique.mockResolvedValueOnce({ id: 'USD' });
      prismaMock.currency.findUnique.mockResolvedValueOnce({ id: 'EUR' });

      prismaMock.exchangeRate.findFirst.mockResolvedValue({
        rate: 1.5,
        timestamp: new Date(),
      });

      prismaMock.conversionHistory.create.mockResolvedValue({
        id: '1',
        userId: 'USER1',
        fromCurrencyId: 'USD',
        toCurrencyId: 'EUR',
        amount: 10,
        result: 15,
        rateUsed: 1.5,
      });

      const result = await service.create({
        userId: 'USER1',
        fromCurrencyId: 'USD',
        toCurrencyId: 'EUR',
        amount: 10,
      });

      expect(result.data.result).toBe(15);
      expect(prismaMock.conversionHistory.create).toHaveBeenCalled();
    });
  });

  describe('getUserHistory()', () => {
    it('should return user history', async () => {
      usersServiceMock.validateUser.mockResolvedValue({ id: 'USER1' });

      prismaMock.conversionHistory.findMany.mockResolvedValue([
        { id: '1', amount: 10 },
      ]);

      const result = await service.getUserHistory('USER1');

      expect(result.data.length).toBe(1);
      expect(prismaMock.conversionHistory.findMany).toHaveBeenCalled();
    });
  });
});
