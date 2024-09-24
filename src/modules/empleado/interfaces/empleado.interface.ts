import { Cargotype, EstadoType, SexoType } from '../enums';

export interface IEmpleado {
  id: string;
  dni: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  edad: number;
  sexo: SexoType;
  fechaNacimiento: Date;
  direccion: string;
  correo: string;
  celular: number;
  cargo: Cargotype;
  estado: EstadoType;
  fechaIngreso: Date | null;
  fechaSalida: Date | null;
  documentosId: string[];
  examenMedicoId: string | null;
  asegurado: boolean;
  registroAsistenciasId: string | null;
}
