import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmissionEntity } from './entities/admission.entity';
import { CreateAdmissionDto } from './dto/admission.dto';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(AdmissionEntity)
    private readonly admissionRepository: Repository<AdmissionEntity>,
  ) {}

  async create(createAdmissionDto: CreateAdmissionDto): Promise<AdmissionEntity> {
    const admission = this.admissionRepository.create(createAdmissionDto);
    return this.admissionRepository.save(admission);
  }
}