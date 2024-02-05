import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TYPES } from '../entities/types.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsEnum(TYPES)
  type: string;
}
