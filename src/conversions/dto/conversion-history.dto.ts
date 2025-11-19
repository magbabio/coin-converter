import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ConversionHistoryDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  fromCurrencyId: string;

  @IsNotEmpty()
  @IsString()
  toCurrencyId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
