import { EstadoAsisteciaType } from '../enums';
import { IAsistencia } from '../interfaces';

export class Asistencia {
  id: string;
  empleadoId: string;
  fecha: Date;
  estado: EstadoAsisteciaType;
  horasExtras: number = 0;
  horasAtrasadas: number = 0;
  fechaModificacion: Date;
  observaciones: string | null;
  constructor(asistencia: IAsistencia) {
    this.id = asistencia.id;
    this.empleadoId = asistencia.empleadoId;
    this.fecha = asistencia.fecha;
    this.estado = asistencia.estado;
    this.horasExtras = asistencia.horasExtras;
    this.horasAtrasadas = asistencia.horasAtrasadas;
    this.fechaModificacion = asistencia.fechaModificacion;
    this.observaciones = asistencia.observaciones;
  }
}
