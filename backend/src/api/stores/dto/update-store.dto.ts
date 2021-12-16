import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsOptional, Min, Max } from 'class-validator';
import { FileParamDto, PhoneNumberRegex, ToRate } from 'src/app/app.service'

export class UpdateStoreDto {
  @IsNotEmpty({ message: 'StoreId is required' })
  id: number|string
  @IsOptional()
  @IsString()
  name: string
  logo: FileParamDto
  @IsOptional()
  phoneNumber: string
}
