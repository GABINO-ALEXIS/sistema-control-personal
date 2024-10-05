import { Documento } from './entities/documento.entity';
import { Documento as DocumentoModel } from './schemas/documento.schema';
export class DocumentoMapper {
  static toEntity(doc: DocumentoModel): Documento {
    return new Documento({
      id: doc._id.toString(),
      empleadoId: doc.empleadoId.toString(),
      tipoDocumento: doc.tipoDocumento,
      url: doc.url,
    });
  }

  static toEntities(docs: DocumentoModel[]): Documento[] {
    return docs.map(this.toEntity);
  }
}
