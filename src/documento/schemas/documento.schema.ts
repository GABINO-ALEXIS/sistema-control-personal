import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { DocumentoType } from '../enums';

@Schema()
export class Documento extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Empleado',
  })
  empleadoId: string;

  @Prop({ type: String, enum: DocumentoType, required: true })
  tipoDocumento: DocumentoType;

  @Prop({ type: String, required: true })
  url: string;
}

export const DocumentoSchema = SchemaFactory.createForClass(Documento);
