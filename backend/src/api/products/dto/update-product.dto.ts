import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { FileParamDto, PhoneNumberRegex } from 'src/app/app.service'

export class UpdateProductDto {
  @IsNotEmpty()
  id: string
  @IsString()
  @IsOptional()
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
