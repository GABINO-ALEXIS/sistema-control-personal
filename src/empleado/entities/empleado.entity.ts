/* eslint-disable @typescript-eslint/no-unused-vars */
import { Documento } from 'src/documento/entities/documento.entity';
import { Cargotype, EstadoType, SexoType } from '../enums';
import { IDireccion, IEmpleado, IExamenMedico } from '../interfaces';

export class Empleado {
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

  constructor(empleado: IEmpleado) {
    this.id = empleado.id;
    this.dni = empleado.dni;
    this.nombres = empleado.nombres;
    this.apellidos = empleado.apellidos;
    this.edad = empleado.edad;
    this.sexo = empleado.sexo;
    this.fechaNacimiento = empleado.fechaNacimiento;
    this.direccion = empleado.direccion;
    this.correo = empleado.correo;
    this.celular = empleado.celular;
    this.cargo = empleado.cargo;
    this.estado = empleado.estado;
    this.asegurado = empleado.asegurado;
    this.examenMedico = empleado.examenMedico;
  }
}
