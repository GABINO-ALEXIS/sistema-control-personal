import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentoSchema } from './schemas/documento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Documento.name, schema: DocumentoSchema },
    ]),
  ],
  controllers: [DocumentoController],
  providers: [DocumentoService],
})
export class DocumentoModule {}
