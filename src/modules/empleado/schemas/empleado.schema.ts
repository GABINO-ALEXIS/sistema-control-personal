import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cargotype, EstadoType, SexoType } from '../enums';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Empleado extends Document {
  @Prop({ type: Number, required: true, unique: true })
  dni: number;

  @Prop({ type: String, required: true })
  nombres: string;

  @Prop({ type: String, required: true })
  apellidoPaterno: string;

  @Prop({ type: String, required: true })
  apellidoMaterno: string;

  @Prop({ type: Number, required: true })
  edad: number;

  @Prop({ type: String, enum: SexoType, required: true })
  sexo: string;

  @Prop({ type: Date, required: true })
  fechaNacimiento: Date;

  @Prop({ type: String, required: true })
  direccion: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  correo: string;

  @Prop({ type: Number, required: true })
  celular: number;

  @Prop({ type: String, enum: Cargotype, required: true })
  cargo: Cargotype;

  @Prop({ type: String, enum: EstadoType, default: EstadoType.Inactivo })
  estado: EstadoType;

  @Prop({ type: Date, default: null })
  fechaIngreso: Date | null;

  @Prop({ type: Date, default: null })
  fechaSalida: Date | null;

  @Prop({ type: [String], default: [] })
  documentosId: string[]; // pendiente decir que es un id ( no es un error)

  @Prop({ type: String, default: null })
  examenMedicoId: string; // pendiente decir que es un id ( no es un error)

  @Prop({ type: Boolean, default: false })
  asegurado: boolean;

  @Prop({ type: String, default: null })
  registroAsistenciasId: string; // pendiente decir que es un id ( no es un error)
}

export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);
