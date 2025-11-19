import { Body, Controller, Get, Query, Post, Param } from '@nestjs/common';
import { ConversionsService } from './conversions.service';
import { ConversionDto } from './dto/conversion.dto';
import { ConversionHistoryDto } from './dto/conversion-history.dto';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Get()
  conversion(
    @Query('fromCurrencyId') fromCurrencyId: string, 
    @Query('toCurrencyId') toCurrencyId: string,
    @Query('amount') amount: number
  ) {
    return this.conversionsService.conversion(fromCurrencyId, toCurrencyId, Number(amount));
  }

  @Post()
  async create(@Body() conversionHistoryDto: ConversionHistoryDto) {
    return this.conversionsService.create(conversionHistoryDto);
  }

  @Get('history/:userId')
  getUserHistory(@Param('userId') userId: string) {
    return this.conversionsService.getUserHistory(userId);
  }

}
