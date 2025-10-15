import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteCurrenciesService } from './favorite-currencies.service';
import { CreateFavoriteCurrencyDto } from './dto/create-favorite-currency.dto';

@Controller('favorite-currencies')
export class FavoriteCurrenciesController {
  constructor(
    private readonly favoriteCurrenciesService: FavoriteCurrenciesService,
  ) {}

  @Post()
  create(@Body() createFavoriteCurrencyDto: CreateFavoriteCurrencyDto) {
    return this.favoriteCurrenciesService.create(createFavoriteCurrencyDto);
  }

  @Get()
  findAll() {
    return this.favoriteCurrenciesService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.favoriteCurrenciesService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteCurrenciesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteCurrenciesService.remove(id);
  }

  @Delete('user/:userId/currency/:currencyId')
  removeByUserAndCurrency(
    @Param('userId') userId: string,
    @Param('currencyId') currencyId: string,
  ) {
    return this.favoriteCurrenciesService.removeByUserAndCurrency(
      userId,
      currencyId,
    );
  }
}
