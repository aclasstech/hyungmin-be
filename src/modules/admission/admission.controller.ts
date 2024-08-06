import { Controller, Post, Body } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { CreateAdmissionDto } from './dto/admission.dto';

@Controller('admissions')
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Post()
  async create(@Body() createAdmissionDto: CreateAdmissionDto) {
    return this.admissionService.create(createAdmissionDto);
  }
}