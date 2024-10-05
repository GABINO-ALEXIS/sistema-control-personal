import { Cargotype, EstadoType, SexoType } from '../enums';
import { IDireccion, IExamenMedico } from './';

export interface IEmpleado {
  id: string;
  dni: number;
  nombres: string;
  apellidos: string;
  edad: number;
  sexo: SexoType;
  fechaNacimiento: Date;
  direccion: IDireccion;
  correo: string;
  celular: number;
  cargo: Cargotype;
  estado: EstadoType;
  asegurado: boolean;
  examenMedico: IExamenMedico;
}
