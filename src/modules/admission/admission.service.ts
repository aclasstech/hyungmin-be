import { Injectable } from "@nestjs/common";
import { CreateAdmissionDto } from "./dto/admission.dto";
import { AdmissionRepositoryInterface } from "./interfaces/admission.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Admission } from "./schemas/admission.schema";

@Injectable()
export class AdmissionService {
  constructor(
    @InjectModel(Admission.name)
    private readonly admissionRepository: AdmissionRepositoryInterface
  ) {}

  async create(createAdmissionDto: CreateAdmissionDto): Promise<Admission> {
    return await this.admissionRepository.create(createAdmissionDto);
  }
}
