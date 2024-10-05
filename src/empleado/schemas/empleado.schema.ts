import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Cargotype, EstadoType, SexoType } from '../enums';
import { IDireccion, IExamenMedico } from '../interfaces';

class Direccion {
  @Prop({ type: String, required: true })
  departamento: string;

  @Prop({ type: String, required: true })
  provincia: string;

  @Prop({ type: String, required: true })
  distrito: string;

  @Prop({ type: String, required: true })
  domicilio: string;
}

class ExamenMedico {
  @Prop({ type: Date, required: true })
  fecha: Date;

  @Prop({ type: MongooseSchema.Types.Decimal128, required: true })
  montoGastado: number;

  @Prop({ type: String, required: true })
  alta: boolean;
}

@Schema()
export class Empleado extends Document {
  @Prop({ type: Number, required: true, unique: true })
  dni: number;

  @Prop({ type: String, required: true })
  nombres: string;

  @Prop({ type: String, required: true })
  apellidos: string;

  @Prop({ type: Number, required: true })
  edad: number;

  @Prop({ type: String, enum: SexoType, required: true })
  sexo: string;

  @Prop({ type: Date, required: true })
  fechaNacimiento: Date;

  @Prop({ type: Direccion, required: true })
  direccion: IDireccion;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  correo: string;

  @Prop({ type: Number, required: true, unique: true })
  celular: number;

  @Prop({ type: String, enum: Cargotype, required: true })
  cargo: Cargotype;

  @Prop({ type: String, enum: EstadoType, default: EstadoType.Inactivo })
  estado: EstadoType;

  @Prop({ type: Boolean, default: false })
  asegurado: boolean;

  @Prop({ type: ExamenMedico, default: null })
  examenMedico: IExamenMedico;
}

export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);
