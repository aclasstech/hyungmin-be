import { BaseInterfaceRepository } from "~/common/bases/repository/base.interface";
import { LoginLogEntity } from "../entities/login-log.entity";

export type SystemLogRepositoryInterface =
  BaseInterfaceRepository<LoginLogEntity>;
