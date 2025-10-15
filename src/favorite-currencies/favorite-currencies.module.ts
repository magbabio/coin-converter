import { Module } from '@nestjs/common';
import { FavoriteCurrenciesService } from './favorite-currencies.service';
import { FavoriteCurrenciesController } from './favorite-currencies.controller';

@Module({
  controllers: [FavoriteCurrenciesController],
  providers: [FavoriteCurrenciesService],
  exports: [FavoriteCurrenciesService],
})
export class FavoriteCurrenciesModule {}
