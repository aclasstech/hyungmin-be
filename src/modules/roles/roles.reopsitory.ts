import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./entities/role.entity";
import { BaseAbstractRepository } from "../../common/bases/repository/base.abstract";
import { RoleRepositoryInterface } from "./interfaces/roles.interface";

@Injectable()
export class RoleRepository
  extends BaseAbstractRepository<RoleEntity>
  implements RoleRepositoryInterface
{
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {
    super(roleRepository);
  }
}
