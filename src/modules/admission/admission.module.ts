import { Module } from "@nestjs/common";
import { AdmissionController } from "./admission.controller";
import { AdmissionService } from "./admission.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Admission, AdmissionSchema } from "./schemas/admission.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admission.name, schema: AdmissionSchema },
    ]),
  ],
  controllers: [AdmissionController],
  providers: [AdmissionService],
  exports: [AdmissionService],
})
export class AdmissionModule {}
