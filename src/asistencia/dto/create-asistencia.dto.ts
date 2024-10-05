import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { EstadoAsisteciaType } from '../enums';
import { Transform } from 'class-transformer';

export class CreateAsistenciaDto {
  @IsMongoId()
  empleadoId: string;

  @IsEnum(EstadoAsisteciaType)
  estado: EstadoAsisteciaType;

  @IsOptional()
  @IsPositive()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Las horas extras deben ser un número con hasta 2 decimales',
    },
  )
  horasExtras: number;

  @IsOptional()
  @IsPositive()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Las horas atrasadas deben ser un número con hasta 2 decimales',
    },
  )
  horasAtrasadas: number;

  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsString({ message: 'Las observaciones deben ser una cadena de texto.' })
  @Length(3, 40, {
    message: 'Las observaciones deben tener entre 3 y 40 caracteres.',
  })
  @IsNotEmpty({ message: 'Las observaciones no pueden ser cadenas vacias.' })
  observaciones?: string;
}
