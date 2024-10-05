import { EstadoAsisteciaType } from '../enums';

export interface IAsistencia {
  id: string;
  empleadoId: string;
  fecha: Date;
  estado: EstadoAsisteciaType;
  horasExtras: number;
  horasAtrasadas: number;
  fechaModificacion: Date;
  observaciones: string | null;
}
