import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Cargotype, EstadoType, SexoType } from '../enums';
import { IsValidDni } from '../decorators';
import { Transform } from 'class-transformer';
import { IsDateInRange } from '../decorators/is-date-in-range.decorator';

export class CreateEmpleadoDto {
  @IsInt({ message: 'El dni debe ser un número entero válido.' })
  @IsValidDni()
  dni: number;

  @IsString({ message: 'Los nombres deben ser una cadena de texto.' })
  @Length(3, 20, {
    message: 'Los nombres deben tener entre 3 y 20 caracteres.',
  })
  @IsNotEmpty({ message: 'Los nombres no pueden ser cadenas vacias.' })
  nombres: string;

  @IsString({ message: 'El apellido paterno debe ser una cadena de texto.' })
  @Length(3, 12, {
    message: 'El apellido paterno debe tener entre 3 y 12 caracteres.',
  })
  @IsNotEmpty({
    message: 'El apellido paterno no pueden ser una cadena vacia.',
  })
  apellidoPaterno: string;

  @IsString({ message: 'El apellido materno debe ser una cadena de texto.' })
  @Length(3, 12, {
    message: 'El apellido materno debe tener entre 3 y 12 caracteres.',
  })
  @IsNotEmpty({
    message: 'El apellido materno no pueden ser una cadena vacia.',
  })
  apellidoMaterno: string;

  @IsInt({ message: 'La edad debe ser un número.' })
  @Min(18, { message: 'La edad no puede ser menor a 18 años.' })
  @Max(80, { message: 'La edad no puede ser mayor a 80 años.' })
  edad: number;

  @IsEnum(SexoType, {
    message: 'El sexo debe ser "Masculino" o "Femenino".',
  })
  sexo: string;

  @Transform(({ value }) => {
    if (value !== null && value !== undefined) return new Date(value);
    return value;
  })
  @IsDate({
    message:
      'La fecha de nacimiento es requerida y debe tener un formato válido.',
  })
  @IsDateInRange(
    { max: new Date() },
    { message: 'La fecha de nacimiento no puede ser mayor a la fecha actual.' },
  )
  fechaNacimiento: Date;

  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @Length(6, 50, {
    message: 'La dirección debe tener entre 6 y 50 caracteres.',
  })
  @IsNotEmpty({ message: 'La dirección no puede ser una cadena vacia.' })
  direccion: string;

  @IsEmail()
  correo: string;

  @Transform(({ value }) => String(value))
  @IsMobilePhone('es-PE')
  celular: number;

  @IsEnum(Cargotype)
  cargo: Cargotype;

  @IsEnum(EstadoType)
  @IsOptional()
  estado: EstadoType;

  @Transform(({ value }) => {
    if (value !== null && value !== undefined) return new Date(value);
    return value;
  })
  @IsDate({
    message: 'La fecha de ingreso debe tener un formato válido',
  })
  @IsDateInRange(
    { min: new Date() },
    { message: 'La fecha de ingreso no puede ser menor a la fecha actual' },
  )
  @IsOptional()
  fechaIngreso?: Date | null;

  @Transform(({ value }) => {
    if (value !== null && value !== undefined) return new Date(value);
    return value;
  })
  @IsDate({
    message: 'La fecha de salida debe tener un formato válido',
  })
  @IsDateInRange(
    { min: new Date() },
    { message: 'La fecha de salida no puede ser menor a la fecha actual' },
  )
  @IsOptional()
  fechaSalida?: Date | null;

  @IsArray()
  @IsMongoId({
    each: true,
    message: 'Cada valor en documentosId debe ser un id de mongodb',
  })
  @IsOptional()
  documentosId?: string[];

  @IsMongoId({ message: 'El examen médico debe ser un id de mongodb' })
  @IsOptional()
  examenMedicoId?: string;

  @IsBoolean()
  asegurado: boolean;

  @IsMongoId({
    message: 'El registro de asistencias debe ser un id de mongodb',
  })
  @IsOptional()
  registroAsistenciasId?: string;
}
