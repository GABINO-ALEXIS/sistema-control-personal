import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Documento as DocumentoModel } from './schemas/documento.schema';
import { Model } from 'mongoose';
import { DocumentoMapper } from './documento.mapper';
import { Documento } from './entities/documento.entity';
import { BuscarDocumentoDto } from './dto/buscar-documento.dto';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectModel(DocumentoModel.name)
    private documentoModel: Model<DocumentoModel>,
  ) {}

  async crearDocumento(
    createDocumentoDto: CreateDocumentoDto,
  ): Promise<Documento> {
    const documentoDoc = await this.documentoModel.create(createDocumentoDto);
    const documentoEntity = DocumentoMapper.toEntity(documentoDoc);
    return documentoEntity;
  }

  async obtenerDocumentos(): Promise<Documento[]> {
    const documentosDoc = await this.documentoModel.find();
    const documentosEntities = DocumentoMapper.toEntities(documentosDoc);
    return documentosEntities;
  }

  async buscarDocumentos(buscarDocumentoDto: BuscarDocumentoDto) {
    const { empleadoId, tipoDocumento } = buscarDocumentoDto;
    const query: Record<string, unknown> = {};
    if (empleadoId) query.empleadoId = empleadoId;
    if (tipoDocumento)
      query.tipoDocumento = { $regex: tipoDocumento, $options: 'i' };
    console.log(query);

    const documentosDoc = await this.documentoModel.find(query);
    const documentosEntities = DocumentoMapper.toEntities(documentosDoc);
    return documentosEntities;
  }

  async obtenerDocumento(id: string): Promise<Documento> {
    const documentoDoc = await this.documentoModel.findById(id);
    if (!documentoDoc)
      throw new NotFoundException(`El documento con el id ${id} no existe`);
    const documentoEntity = DocumentoMapper.toEntity(documentoDoc);
    return documentoEntity;
  }

  async actualizarDocumento(
    id: string,
    updateDocumentoDto: UpdateDocumentoDto,
  ): Promise<Documento> {
    const documentoActDoc = await this.documentoModel.findByIdAndUpdate(
      id,
      updateDocumentoDto,
      { new: true },
    );
    if (!documentoActDoc)
      throw new NotFoundException(`El documento con el id ${id} no existe`);
    const documentoEntity = DocumentoMapper.toEntity(documentoActDoc);
    return documentoEntity;
  }

  async eliminarDocumento(id: string): Promise<Documento> {
    const documentoEliminadoDoc =
      await this.documentoModel.findByIdAndDelete(id);
    if (!documentoEliminadoDoc)
      throw new NotFoundException(`El documento con el id ${id} no existe`);
    const documentoEntity = DocumentoMapper.toEntity(documentoEliminadoDoc);
    return documentoEntity;
  }
}
