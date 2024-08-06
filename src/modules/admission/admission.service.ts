import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdmissionEntity } from './entities/admission.entity';
import { CreateAdmissionDto } from './dto/admission.dto';
import { AdmissionRepositoryInterface } from './interfaces/admission.interface';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(AdmissionEntity)
    private readonly admissionRepository: AdmissionRepositoryInterface,
  ) {}

  async create(createAdmissionDto: CreateAdmissionDto): Promise<AdmissionEntity> {
    const admission = await this.admissionRepository.create(createAdmissionDto);
    return await this.admissionRepository.save(admission);
  }
}