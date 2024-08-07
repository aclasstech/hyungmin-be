import { BaseRepository } from "~/common/bases/repository/base.interface"
import { LoginLog } from "../schemas/login-log.schema";

export type SystemLogRepositoryInterface = BaseRepository<LoginLog>;
