import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BuscarEmpleadoDto, CreateEmpleadoDto, UpdateEmpleadoDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Empleado as EmpleadoModel } from './schemas/empleado.schema';
import { Model } from 'mongoose';
import { EmpleadoMapper } from './empleado.mapper';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectModel(EmpleadoModel.name)
    private empleadoModel: Model<EmpleadoModel>,
  ) {}

  async crearEmpleado(createEmpleadoDto: CreateEmpleadoDto): Promise<any> {
    try {
      const empleadoDoc = await this.empleadoModel.create(createEmpleadoDto);
      const empleadoEntity = EmpleadoMapper.toEntity(empleadoDoc);
      return empleadoEntity;
    } catch (e: any) {
      if (e.code === 11000)
        throw new ConflictException(
          `El campo ${JSON.stringify(e.keyValue)} ya esta registrado`,
        );

      console.log(e);

      throw new InternalServerErrorException('Error al crear el empleado');
    }
  }

  async obtenerEmpleados(): Promise<Empleado[]> {
    const empleadosDocs = await this.empleadoModel.find();
    const empleadosEntities = EmpleadoMapper.toEntities(empleadosDocs);
    return empleadosEntities;
  }

  async buscarEmpleados(
    buscarEmpleadoDto: BuscarEmpleadoDto,
  ): Promise<Empleado[]> {
    const { dni, nombres, apellidos, sexo, cargo, estado, asegurado } =
      buscarEmpleadoDto;

    const query: Record<string, unknown> = {};

    if (dni) query.dni = dni;
    if (nombres) query.nombres = { $regex: nombres, $options: 'i' };
    if (apellidos) query.apellidos = { $regex: apellidos, $options: 'i' };
    if (sexo) query.sexo = sexo;
    if (cargo) query.cargo = cargo;
    if (estado) query.estado = estado;
    if (asegurado !== undefined) query.asegurado = asegurado;

    const empleadosDoc = await this.empleadoModel.find(query);
    const empleadosEntities = EmpleadoMapper.toEntities(empleadosDoc);

    return empleadosEntities;
  }

  async obtenerEmpleado(id: string): Promise<Empleado> {
    const empleadoDoc = await this.empleadoModel.findById(id);
    if (!empleadoDoc)
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    const empleadoEntity = EmpleadoMapper.toEntity(empleadoDoc);
    return empleadoEntity;
  }

  async actualizarEmpleado(
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

  async eliminarEmpleado(id: string): Promise<Empleado> {
    const empleadoEliminadoDoc = await this.empleadoModel.findByIdAndDelete(id);
    if (!empleadoEliminadoDoc)
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    const empleadoEliminadoEntity =
      EmpleadoMapper.toEntity(empleadoEliminadoDoc);
    return empleadoEliminadoEntity;
  }
}
