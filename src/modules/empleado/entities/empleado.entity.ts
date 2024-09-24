/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cargotype, EstadoType, SexoType } from '../enums';
import { IEmpleado } from '../interfaces';

export class Empleado {
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

  constructor(empleado: IEmpleado) {
    this.id = empleado.id;
    this.dni = empleado.dni;
    this.nombres = empleado.nombres;
    this.apellidoPaterno = empleado.apellidoPaterno;
    this.apellidoMaterno = empleado.apellidoMaterno;
    this.edad = empleado.edad;
    this.sexo = empleado.sexo;
    this.fechaNacimiento = empleado.fechaNacimiento;
    this.direccion = empleado.direccion;
    this.correo = empleado.correo;
    this.celular = empleado.celular;
    this.cargo = empleado.cargo;
    this.estado = empleado.estado;
    this.fechaIngreso = empleado.fechaIngreso;
    this.fechaSalida = empleado.fechaSalida;
    this.documentosId = empleado.documentosId;
    this.examenMedicoId = empleado.examenMedicoId;
    this.asegurado = empleado.asegurado;
    this.registroAsistenciasId = empleado.registroAsistenciasId;
  }
}
