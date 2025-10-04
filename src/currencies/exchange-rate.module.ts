import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  providers: [ExchangeRateService, PrismaService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
