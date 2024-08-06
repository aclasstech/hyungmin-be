import { BaseInterfaceRepository } from "~/common/bases/repository/base.interface";
import { AdmissionEntity } from "../entities/admission.entity";

export type AdmissionRepositoryInterface = BaseInterfaceRepository<AdmissionEntity>;