import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EstadoAsisteciaType } from '../enums';

@Schema({ timestamps: { createdAt: 'fecha', updatedAt: 'fechaModificacion' } })
export class Asistencia extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Empleado',
  })
  empleadoId: string;

  @Prop({ type: String, enum: EstadoAsisteciaType, required: true })
  estado: EstadoAsisteciaType;

  @Prop({ type: Number, default: 0 })
  horasExtras: number;

  @Prop({ type: Number, default: 0 })
  horasAtrasadas: number;

  @Prop({ type: String, default: null })
  observaciones: string;

  @Prop({ type: Date })
  fecha?: Date;

  @Prop({ type: Date })
  fechaModificacion?: Date;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
