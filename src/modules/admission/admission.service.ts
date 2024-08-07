import { Injectable } from "@nestjs/common";
import { CreateAdmissionDto } from "./dto/admission.dto";
import { AdmissionRepository } from "./repositories/admission.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Admission } from "./schemas/admission.schema";
import { BaseService } from "~/common/bases/base.service";

@Injectable()
export class AdmissionService extends BaseService<Admission> {
  constructor(
    @InjectModel(Admission.name)
    private readonly admissionRepository: AdmissionRepository
  ) {
    super(admissionRepository);
  }

  async getAdmission() {
    return await this.admissionRepository.findAll({});
  }

  async create(createAdmissionDto: CreateAdmissionDto): Promise<Admission> {
    return await this.admissionRepository.create(createAdmissionDto);
  }
}
