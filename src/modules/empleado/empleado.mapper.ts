import { Empleado } from './entities/empleado.entity';
import { SexoType } from './enums';
import { Empleado as EmpleadoSchema } from './schemas/empleado.schema';

export class EmpleadoMapper {
  static toEntity(doc: EmpleadoSchema): Empleado {
    return new Empleado({
      id: doc._id.toString(),
      dni: doc.dni,
      nombres: doc.nombres,
      apellidoPaterno: doc.apellidoPaterno,
      apellidoMaterno: doc.apellidoMaterno,
      edad: doc.edad,
      sexo: doc.sexo as SexoType,
      fechaNacimiento: doc.fechaNacimiento,
      direccion: doc.direccion,
      correo: doc.correo,
      celular: doc.celular,
      cargo: doc.cargo,
      estado: doc.estado,
      fechaIngreso: doc.fechaIngreso,
      fechaSalida: doc.fechaSalida,
      documentosId: doc.documentosId.map((doc) => doc.toString()),
      examenMedicoId: doc.examenMedicoId ? doc.examenMedicoId.toString() : null,
      asegurado: doc.asegurado,
      registroAsistenciasId: doc.registroAsistenciasId
        ? doc.registroAsistenciasId.toString()
        : null,
    });
  }

  static toEntities(docs: EmpleadoSchema[]): Empleado[] {
    return docs.map(this.toEntity);
  }
}
