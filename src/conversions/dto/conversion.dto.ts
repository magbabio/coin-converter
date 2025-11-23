import { IsDecimal, IsNotEmpty } from 'class-validator';

export class ConversionDto {
  @IsNotEmpty()
  @IsDecimal()
  amount: number;
}
