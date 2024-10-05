import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { DocumentoType } from '../enums';
import { Transform } from 'class-transformer';
import { toCamelCase } from 'src/helpers';

export class BuscarDocumentoDto {
  @IsOptional()
  @IsMongoId({ message: 'El id del empleado debe ser un id de MongoDB válido' })
  empleadoId?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? toCamelCase(value) : value))
  @IsEnum(DocumentoType)
  tipoDocumento?: DocumentoType;
}
