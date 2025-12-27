import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateEpisodioDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsInt()
  @IsPositive()
  duracion: number;

  @IsInt()
  @IsPositive()
  numeroCapitulo: number;

  @IsInt()
  @IsPositive()
  serieId: number;
}
