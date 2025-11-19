import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConversionsModule } from './conversions/conversions.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BinanceModule } from './scraper/binance.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ConversionsModule,
    CurrenciesModule,
    ScheduleModule.forRoot(),
    BinanceModule,
  ],
})
export class AppModule {}
