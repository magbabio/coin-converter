import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteCurrencyDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  currencyId: string;
}
