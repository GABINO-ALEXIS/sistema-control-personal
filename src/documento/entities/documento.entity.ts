import { DocumentoType } from '../enums';
import { IDocumento } from '../interfaces';

export class Documento {
  id: string;
  empleadoId: string;
  tipoDocumento: DocumentoType;
  url: string;

  constructor({ id, empleadoId, tipoDocumento, url }: IDocumento) {
    this.id = id;
    this.empleadoId = empleadoId;
    this.tipoDocumento = tipoDocumento;
    this.url = url;
  }
}
