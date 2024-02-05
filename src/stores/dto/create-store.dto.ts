import { IsNotEmpty, IsString, IsUppercase, Length } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(3, 3, { message: 'city must be equal to 3 characters' })
  @IsUppercase()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
