import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { joiValidationSchema } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpleadoModule } from './empleado/empleado.module';
import { CommonModule } from './common/common.module';
import { DocumentoModule } from './documento/documento.module';
import { AsistenciaModule } from './asistencia/asistencia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joiValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    EmpleadoModule,
    CommonModule,
    DocumentoModule,
    AsistenciaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
