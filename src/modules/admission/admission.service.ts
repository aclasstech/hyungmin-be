import { Injectable } from "@nestjs/common";
import { CreateAdmissionDto } from "./dto/admission.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admission, AdmissionDocument } from "./schemas/admission.schema";
import { BaseService } from "~/common/bases/base.service";
import { BaseRepository } from "~/common/bases/base.repository";

@Injectable()
export class AdmissionService extends BaseService<AdmissionDocument> {
  constructor(
    @InjectModel(Admission.name)
    private readonly admissionRepository: BaseRepository<AdmissionDocument>
  ) {
    super(admissionRepository);
  }

  async getAdmission(): Promise<Admission[]> {
    return await this.find({});
  }

  async createNewAdmission(
    createAdmissionDto: CreateAdmissionDto
  ): Promise<Admission> {
    return await this.save(createAdmissionDto);
  }
}
