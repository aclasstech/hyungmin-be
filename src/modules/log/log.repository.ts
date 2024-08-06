import { Injectable } from "@nestjs/common";
import { BaseAbstractRepository } from "~/common/bases/repository/base.abstract";
import { LoginLogEntity } from "./entities/login-log.entity";
import { SystemLogRepositoryInterface } from "./interfaces/log.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SystemLogRepository
  extends BaseAbstractRepository<LoginLogEntity>
  implements SystemLogRepositoryInterface
{
  constructor(
    @InjectRepository(LoginLogEntity)
    private readonly loginLogRepository: Repository<LoginLogEntity>
  ) {
    super(loginLogRepository);
  }
}
