import { BaseRepository } from "~/common/bases/repository/base.interface";
import { Admission } from "../schemas/admission.schema";

export type AdmissionRepositoryInterface = BaseRepository<Admission>;
