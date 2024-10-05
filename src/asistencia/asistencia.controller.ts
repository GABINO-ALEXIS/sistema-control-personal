import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { ParseMongoId } from 'src/common/pipes';

@Controller('asistencias')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  crearAsistencia(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.crearAsistencia(createAsistenciaDto);
  }

  @Get()
  obtenerAsistencias() {
    return this.asistenciaService.obtenerAsistencias();
  }

  @Get(':id')
  obtenerAsistencia(@Param('id', ParseMongoId) id: string) {
    return this.asistenciaService.obtenerAsistencia(id);
  }

  @Patch(':id')
  actualizarAsistencia(
    @Param('id') id: string,
    @Body() updateAsistenciaDto: UpdateAsistenciaDto,
  ) {
    return this.asistenciaService.actualizarAsistencia(id, updateAsistenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciaService.remove(+id);
  }
}
