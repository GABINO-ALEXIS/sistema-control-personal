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
import { DocumentoService } from './documento.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { ParseMongoId } from 'src/common/pipes';
import { BuscarDocumentoDto } from './dto/buscar-documento.dto';

@Controller('documentos')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  crearDocumento(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentoService.crearDocumento(createDocumentoDto);
  }

  @Get()
  obtenerDocumentos() {
    return this.documentoService.obtenerDocumentos();
  }

  @Get('buscar')
  buscarDocumentos(@Query() buscarDocumentoDto: BuscarDocumentoDto) {
    return this.documentoService.buscarDocumentos(buscarDocumentoDto);
  }

  @Get(':id')
  obtenerDocumento(@Param('id', ParseMongoId) id: string) {
    return this.documentoService.obtenerDocumento(id);
  }

  @Patch(':id')
  actualizarDocumento(
    @Param('id', ParseMongoId) id: string,
    @Body() updateDocumentoDto: UpdateDocumentoDto,
  ) {
    return this.documentoService.actualizarDocumento(id, updateDocumentoDto);
  }

  @Delete(':id')
  eliminarDocumento(@Param('id', ParseMongoId) id: string) {
    return this.documentoService.eliminarDocumento(id);
  }
}
