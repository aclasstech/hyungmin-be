import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdmissionEntity } from "./entities/admission.entity";
import { AdmissionController } from "./admission.controller";
import { AdmissionService } from "./admission.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([AdmissionEntity]),
    ],
    controllers: [AdmissionController],
    providers: [AdmissionService],
    exports: [AdmissionService],
  })
  export class AdmissionModule {}