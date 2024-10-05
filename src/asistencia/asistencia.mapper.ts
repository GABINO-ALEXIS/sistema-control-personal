import { Asistencia } from './entities/asistencia.entity';
import { Asistencia as AsistenciaModel } from './schemas/asistencia.schema';

export class AsistenciaMapper {
  static toEntity(doc: AsistenciaModel): Asistencia {
    return new Asistencia({
      id: doc._id.toString(),
      empleadoId: doc.empleadoId.toString(),
      estado: doc.estado,
      fecha: doc.fecha,
      horasExtras: doc.horasExtras,
      horasAtrasadas: doc.horasAtrasadas,
      fechaModificacion: doc.fechaModificacion,
      observaciones: doc.observaciones,
    });
  }
  static toEntities(docs: AsistenciaModel[]): Asistencia[] {
    return docs.map(this.toEntity);
  }
}
