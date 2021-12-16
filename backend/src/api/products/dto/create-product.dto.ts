import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional } from 'class-validator';
import { FileParamDto, PhoneNumberRegex } from 'src/app/app.service';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  logo: FileParamDto
  price: string
  size: string
  currency: string
  expireAt: Date
  @IsNotEmpty({ message: 'CategoryId is required' })
  categoryId: string
  storeId: string
}
