import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { FileParamDto, PhoneNumberRegex } from 'src/app/app.service'

export class UpdateCategoryDto {
  @IsNotEmpty({message: 'id is required'})
  id: number|string
  @IsString()
  @IsOptional()
  name: string
  logo: FileParamDto
}
