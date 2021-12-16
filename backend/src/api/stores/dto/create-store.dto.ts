import { IsEmail, IsNotEmpty, IsString, IsInt, Max, Min, IsOptional } from 'class-validator';
import { FileParamDto, ToPhone, ToRate } from 'src/app/app.service';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string
  logo: FileParamDto
  phoneNumber: string
}
