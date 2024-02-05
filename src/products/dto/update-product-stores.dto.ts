import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateProductStoresDto {
  @IsArray()
  @IsNotEmpty()
  stores: number[];
}
