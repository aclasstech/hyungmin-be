import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleEntity } from "./entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleRepositoryInterface } from "./interfaces/roles.interface";
import { BaseAbstractService } from "~/common/bases/service/base-service.abstract";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { BusinessException } from "~/common/exceptions/biz.exception";
import { ErrorEnum } from "~/constants/error-code.constant";
import { STATUS } from "~/constants/enum.constant";
import { isEmpty } from "lodash";

@Injectable()
export class RolesService extends BaseAbstractService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: RoleRepositoryInterface
  ) {
    super(rolesRepository);
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const existedRole = await this.findOne({
      where: { name: createRoleDto.name },
    });
    if (existedRole) {
      throw new BusinessException(ErrorEnum.ROLE_EXISTS);
    }
    return await this.create(createRoleDto);
  }

  async findAllRole(offset?: number, limit?: number): Promise<RoleEntity[]> {
    let option = {};
    if (offset && limit) {
      option = {
        skip: offset,
        take: limit,
      };
    }
    return await this.findWithRelations(option);
  }

  async findOneRoleById(id: string): Promise<RoleEntity> {
    const existedRole = await this.findOneById(id);
    if (isEmpty(existedRole)) {
      throw new BusinessException(ErrorEnum.ROLE_NOT_FOUND);
    }
    return existedRole;
  }

  async findOneRoleByName(name: string): Promise<RoleEntity> {
    const existedRole = await this.findByCondition({
      where: { name: name, status: STATUS.ENABLE },
    });
    if (!existedRole) {
      throw new BusinessException(ErrorEnum.ROLE_NOT_FOUND);
    }
    return existedRole;
  }

  async updateRoleById(id: string, updateRoleDto: UpdateRoleDto): Promise<any> {
    const existedRole = await this.findOne({ where: { id: id } });
    if (isEmpty(existedRole)) {
      throw new BusinessException(ErrorEnum.ROLE_NOT_FOUND);
    }
    return await this.updateById(id, updateRoleDto);
  }

  async updateRoleByName(
    name: string,
    updateRoleDto: UpdateRoleDto
  ): Promise<any> {
    const existedRole = await this.findOne({ where: { name: name } });
    if (isEmpty(existedRole)) {
      throw new BusinessException(ErrorEnum.ROLE_NOT_FOUND);
    }
    return await this.updateByOption(existedRole.id, updateRoleDto);
  }

  async deleteRoleById(id: string): Promise<any> {
    const existedRole = await this.findOne({ where: { id: id } });
    if (isEmpty(existedRole)) {
      throw new BusinessException(ErrorEnum.ROLE_NOT_FOUND);
    }
    return await this.deleteById(id, { status: STATUS.DELETED });
  }

  async deleteRoleByName(name: string): Promise<any> {
    const existedRole = await this.findOne({ where: { name: name } });
    if (isEmpty(existedRole)) {
      throw new BusinessException(ErrorEnum.ROLE_NOT_FOUND);
    }

    return await this.deleteByOption(existedRole.id, {
      status: STATUS.DELETED,
    });
  }

  async restoreRoleById(id: string): Promise<any> {
    const deletedRole = await this.findOne({ where: { id: id } });
    if (isEmpty(deletedRole)) {
      throw new BusinessException(ErrorEnum.ROLE_NOT_FOUND);
    }
    return await this.restoreById(id, { status: STATUS.ENABLE });
  }

  async restoreRoleByName(name: string): Promise<any> {
    const deletedRole = await this.findOne({ where: { name: name } });
    if (isEmpty(deletedRole)) {
      throw new BusinessException(ErrorEnum.ROLE_NOT_FOUND);
    }
    return await this.restoreByOption(deletedRole.id, {
      status: STATUS.ENABLE,
    });
  }
}
