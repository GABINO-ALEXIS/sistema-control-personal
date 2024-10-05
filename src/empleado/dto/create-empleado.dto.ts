import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Cargotype, EstadoType, SexoType } from '../enums';
import { IsValidDni } from '../decorators';
import { Transform, Type } from 'class-transformer';
import { IsDateInRange } from '../decorators/is-date-in-range.decorator';
import { IDireccion, IExamenMedico } from '../interfaces';

class DireccionDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 12, {
    message: 'departamento debe tener entre 3 y 12 caracteres.',
  })
  @IsNotEmpty({ message: 'El departamento no puede ser una cadena vacia.' })
  departamento: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 12, {
    message: 'provincia debe tener entre 3 y 12 caracteres.',
  })
  @IsNotEmpty({ message: 'La provincia no puede ser una cadena vacia.' })
  provincia: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 12, {
    message: 'distrito debe tener entre 3 y 12 caracteres.',
  })
  @IsNotEmpty({ message: 'El distrito no puede ser una cadena vacia.' })
  distrito: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(3, 50, {
    message: 'domicilio debe tener entre 3 y 50 caracteres.',
  })
  @IsNotEmpty({
    message: 'domicilio no puede ser una cadena vacia.',
  })
  domicilio: string;
}

class ExamenMedicoDto {
  @Transform(({ value }) => {
    if (value !== null && value !== undefined) return new Date(value);
    return value;
  })
  @IsDate({
    message:
      'fecha del examen médico es requerida y debe tener un formato válido.',
  })
  @IsDateInRange(
    { min: new Date() },
    {
      message: 'fecha del examenMedico no puede ser menor a la fecha actual.',
    },
  )
  fecha: Date;

  @IsNumber(
    { maxDecimalPlaces: 4 },
    { message: 'montoGastado debe ser un número con hasta 4 decimales' },
  )
  montoGastado: number;

  @IsBoolean({ message: 'alta debe ser un boolean' })
  alta: boolean;
}

export class CreateEmpleadoDto {
  @IsInt({ message: 'El dni debe ser un número entero válido.' })
  @IsValidDni()
  dni: number;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Los nombres deben ser una cadena de texto.' })
  @Length(3, 20, {
    message: 'Los nombres deben tener entre 3 y 20 caracteres.',
  })
  @IsNotEmpty({ message: 'Los nombres no pueden ser cadenas vacias.' })
  nombres: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Los apellidos deben ser una cadena de texto.' })
  @Length(3, 25, {
    message: 'Los apellidos deben tener entre 3 y 25 caracteres.',
  })
  @IsNotEmpty({
    message: 'Los apellidos no pueden ser una cadena vacia.',
  })
  apellidos: string;

  @IsInt({ message: 'La edad debe ser un número.' })
  @Max(80, { message: 'La edad no puede ser mayor a 80 años.' })
  @Min(18, { message: 'La edad no puede ser menor a 18 años.' })
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

  @IsDefined({
    message:
      'La direccion es requerida y debe ser un json con los campos de departamento, provincia, distrito y domicilio',
  })
  @ValidateNested({
    message:
      'La direccion debe ser un json con los campos de departamento, provincia, distrito y domicilio',
  })
  @Type(() => DireccionDto)
  direccion: IDireccion;

  @IsEmail({}, { message: 'El correo debe tener un formato válido' })
  correo: string;

  @Transform(({ value }) => String(value))
  @IsMobilePhone(
    'es-PE',
    {},
    { message: 'El celular debe tener un formato válido' },
  )
  celular: number;

  @IsEnum(Cargotype)
  cargo: Cargotype;

  @IsOptional()
  @IsEnum(EstadoType)
  estado?: EstadoType;

  @IsBoolean()
  asegurado: boolean;

  @IsOptional()
  @ValidateNested({
    message:
      'La examen médico debe ser un json con los campos de fecha, montoGastado y alta',
  })
  @Type(() => ExamenMedicoDto)
  examenMedico?: IExamenMedico;

  // @IsOptional()
  // @Transform(({ value }) => {
  //   if (value !== null && value !== undefined) return new Date(value);
  //   return value;
  // })
  // @IsDate({
  //   message: 'La fecha de ingreso debe tener un formato válido',
  // })
  // @IsDateInRange(
  //   { min: new Date() },
  //   { message: 'La fecha de ingreso no puede ser menor a la fecha actual' },
  // )
  // fechaIngreso?: Date | null;

  // @IsOptional()
  // @Transform(({ value }) => {
  //   if (value !== null && value !== undefined) return new Date(value);
  //   return value;
  // })
  // @IsDate({
  //   message: 'La fecha de salida debe tener un formato válido',
  // })
  // @IsDateInRange(
  //   { min: new Date() },
  //   { message: 'La fecha de salida no puede ser menor a la fecha actual' },
  // )
  // fechaSalida?: Date | null;

  // @IsOptional()
  // @IsArray()
  // @IsMongoId({
  //   each: true,
  //   message: 'Cada valor en documentosId debe ser un id de mongodb',
  // })
  // documentosId?: string[] | null;

  // @IsOptional()
  // @IsMongoId({ message: 'El examen médico debe ser un id de mongodb' })
  // examenMedicoId?: string | null;

  // @IsOptional()
  // @IsMongoId({
  //   message: 'El registro de asistencias debe ser un id de mongodb',
  // })
  // registroAsistenciasId?: string | null;
}
