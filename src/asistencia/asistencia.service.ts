import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asistencia as AsistenciaModel } from './schemas/asistencia.schema';
import { Model } from 'mongoose';
import { Asistencia } from './entities/asistencia.entity';
import { AsistenciaMapper } from './asistencia.mapper';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectModel(AsistenciaModel.name)
    private asistenciaModel: Model<AsistenciaModel>,
  ) {}

  async crearAsistencia(
    createAsistenciaDto: CreateAsistenciaDto,
  ): Promise<Asistencia> {
    const asistenciaDoc =
      await this.asistenciaModel.create(createAsistenciaDto);
    const asistencia = AsistenciaMapper.toEntity(asistenciaDoc);
    return asistencia;
  }

  async obtenerAsistencias(): Promise<Asistencia[]> {
    const asistenciasDocs = await this.asistenciaModel.find();
    const asistencias = AsistenciaMapper.toEntities(asistenciasDocs);
    return asistencias;
  }

  async obtenerAsistencia(id: string): Promise<Asistencia> {
    const asistenciaDoc = await this.asistenciaModel.findById(id);
    if (!asistenciaDoc)
      throw new NotFoundException(`La asistencia con el id ${id} no existe`);
    const asistencia = AsistenciaMapper.toEntity(asistenciaDoc);
    return asistencia;
  }

  async actualizarAsistencia(
    id: string,
    updateAsistenciaDto: UpdateAsistenciaDto,
  ): Promise<Asistencia> {
    const asistenciaActDoc = await this.asistenciaModel.findByIdAndUpdate(
      id,
      updateAsistenciaDto,
      { new: true },
    );
    if (!asistenciaActDoc)
      throw new NotFoundException(`La asistencia con el id ${id} no existe`);
    const asistenciaAct = AsistenciaMapper.toEntity(asistenciaActDoc);
    return asistenciaAct;
  }

  async remove(id: number): Promise<any> {
    return `This action removes a #${id} asistencia`;
  }
}
