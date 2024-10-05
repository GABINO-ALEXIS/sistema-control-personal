import { DocumentoType } from '../enums';

export interface IDocumento {
  id: string;
  empleadoId: string;
  tipoDocumento: DocumentoType;
  url: string;
}
