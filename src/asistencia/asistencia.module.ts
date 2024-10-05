import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asistencia, AsistenciaSchema } from './schemas/asistencia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asistencia.name, schema: AsistenciaSchema },
    ]),
  ],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
