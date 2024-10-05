import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { IsValidDni } from '../decorators';
import { Transform } from 'class-transformer';
import { Cargotype, EstadoType, SexoType } from '../enums';
import { toCamelCase } from 'src/helpers';

export class BuscarEmpleadoDto {
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : value))
  @IsInt({ message: 'El dni debe ser un numero' })
  @IsValidDni()
  dni?: number;

  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : value))
  @Length(3, 20, {
    message: 'Los nombres deben tener entre 3 y 20 caracteres.',
  })
  @IsNotEmpty({ message: 'Los nombres no pueden ser cadenas vacias.' })
  nombres?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : value))
  @Length(3, 25, {
    message: 'Los apellidos deben tener entre 3 y 12 caracteres.',
  })
  @IsNotEmpty({
    message: 'Los apellidos no pueden ser una cadena vacia.',
  })
  apellidos?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? toCamelCase(value) : value))
  @IsEnum(SexoType, {
    message: 'El sexo debe ser "Masculino" o "Femenino".',
  })
  sexo?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? toCamelCase(value) : value))
  @IsEnum(Cargotype)
  cargo?: Cargotype;

  @IsOptional()
  @Transform(({ value }) => (value ? toCamelCase(value) : value))
  @IsEnum(EstadoType)
  estado?: EstadoType;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === 'false') return JSON.parse(value);
    return value;
  })
  @IsBoolean({ message: 'El campo asegurado debe ser un boolean' })
  asegurado?: boolean;
}
