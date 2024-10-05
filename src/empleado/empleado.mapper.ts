import { Empleado } from './entities/empleado.entity';
import { SexoType } from './enums';
import { Empleado as EmpleadoModel } from './schemas/empleado.schema';

export class EmpleadoMapper {
  static toEntity(doc: EmpleadoModel): Empleado {
    return new Empleado({
      id: doc._id.toString(),
      dni: doc.dni,
      nombres: doc.nombres,
      apellidos: doc.apellidos,
      edad: doc.edad,
      sexo: doc.sexo as SexoType,
      fechaNacimiento: doc.fechaNacimiento,
      direccion: doc.direccion,
      correo: doc.correo,
      celular: doc.celular,
      cargo: doc.cargo,
      estado: doc.estado,
      asegurado: doc.asegurado,
      examenMedico: doc.examenMedico,
    });
  }

  static toEntities(docs: EmpleadoModel[]): Empleado[] {
    return docs.map(this.toEntity);
  }
}
