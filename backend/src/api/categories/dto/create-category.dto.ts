import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional } from 'class-validator';
import { FileParamDto, PhoneNumberRegex } from 'src/app/app.service';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  logo: FileParamDto
  @IsNotEmpty({ message: 'storeId is required' })
  storeId: string|number
}
