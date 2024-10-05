import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { BuscarEmpleadoDto, CreateEmpleadoDto, UpdateEmpleadoDto } from './dto';
import { ParseMongoId } from 'src/common/pipes';

@Controller('empleados')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  crearEmpleado(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.crearEmpleado(createEmpleadoDto);
  }

  @Get()
  obtenerEmpleados() {
    return this.empleadoService.obtenerEmpleados();
  }

  @Get('buscar')
  buscarEmpleados(@Query() buscarEmpleadoDto: BuscarEmpleadoDto) {
    return this.empleadoService.buscarEmpleados(buscarEmpleadoDto);
  }
  @Get(':id')
  obtenerEmpleado(@Param('id', ParseMongoId) id: string) {
    return this.empleadoService.obtenerEmpleado(id);
  }

  @Patch(':id')
  actualizarEmpleado(
    @Param('id', ParseMongoId) id: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadoService.actualizarEmpleado(id, updateEmpleadoDto);
  }

  @Delete(':id')
  eliminarEmpleado(@Param('id', ParseMongoId) id: string) {
    return this.empleadoService.eliminarEmpleado(id);
  }
}
