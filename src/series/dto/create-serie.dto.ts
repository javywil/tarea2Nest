import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateSerieDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  sinopsis: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  urlPortada: string;
}
