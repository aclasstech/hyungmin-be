import { Controller, Post, Body, Get } from "@nestjs/common";
import { AdmissionService } from "./admission.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Admissions")
@Controller("admissions")
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Get()
  async getAdmission() {
    return await this.admissionService.getAdmission();
  }

  @Post()
  async create(@Body() createAdmissionDto: any) {
    return this.admissionService.create(createAdmissionDto);
  }
}
