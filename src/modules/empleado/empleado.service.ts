import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto, UpdateEmpleadoDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Empleado as EmpleadoSchema } from './schemas/empleado.schema';
import { Model } from 'mongoose';
import { EmpleadoMapper } from './empleado.mapper';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectModel(EmpleadoSchema.name)
    private empleadoModel: Model<EmpleadoSchema>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    try {
      const empleadoDoc = await this.empleadoModel.create(createEmpleadoDto);
      const empleadoEntity = EmpleadoMapper.toEntity(empleadoDoc);
      return empleadoEntity;
    } catch (e: any) {
      if (e.code === 11000)
        throw new ConflictException(
          `El campo ${JSON.stringify(e.keyValue)} ya esta registrado`,
        );

      throw new InternalServerErrorException('Error al crear el empleado');
    }
  }

  async findAll(): Promise<Empleado[]> {
    const empleadosDocs = await this.empleadoModel.find();
    const empleadosEntities = EmpleadoMapper.toEntities(empleadosDocs);
    return empleadosEntities;
  }

  async findOne(id: string): Promise<Empleado> {
    const empleadoDoc = await this.empleadoModel.findById(id);
    if (!empleadoDoc)
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    const empleadoEntity = EmpleadoMapper.toEntity(empleadoDoc);
    return empleadoEntity;
  }

  async update(
    id: string,
    updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    const empleadoActDoc = await this.empleadoModel.findByIdAndUpdate(
      id,
      updateEmpleadoDto,
      { new: true },
    );
    if (!empleadoActDoc)
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    const empleadoActEntity = EmpleadoMapper.toEntity(empleadoActDoc);
    return empleadoActEntity;
  }

  async remove(id: string): Promise<Empleado> {
    const empleadoEliminadoDoc = await this.empleadoModel.findByIdAndDelete(id);
    if (!empleadoEliminadoDoc)
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    const empleadoEliminadoEntity =
      EmpleadoMapper.toEntity(empleadoEliminadoDoc);
    return empleadoEliminadoEntity;
  }
}
