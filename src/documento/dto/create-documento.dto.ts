import { IsEnum, IsMongoId, IsUrl } from 'class-validator';
import { DocumentoType } from '../enums';

export class CreateDocumentoDto {
  @IsMongoId({
    message: 'El id del empleado debe ser un id de MongoDB válido',
  })
  empleadoId: string;

  @IsEnum(DocumentoType)
  tipoDocumento: DocumentoType;

  @IsUrl({
    protocols: ['https'],
    require_protocol: true,
    host_whitelist: ['res.cloudinary.com'],
    allow_fragments: false,
    allow_query_components: false,
  })
  url: string;
}
