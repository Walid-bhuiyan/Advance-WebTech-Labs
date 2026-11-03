
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  Id: string;

  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  expertise: string;

  @IsInt()
  @IsNotEmpty()
  noOfPublication: number;
}
