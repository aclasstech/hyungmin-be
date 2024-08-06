import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";

import { BaseInterfaceRepository } from "../repository/base.interface";
import { BaseInterfaceService } from "./base-service.interface";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { dateTime } from "src/common/decorators/date-time.decorator";

export abstract class BaseAbstractService<T>
  implements BaseInterfaceService<T>
{
  constructor(private readonly repository: BaseInterfaceRepository<T>) {}

  public async create(data: any): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  public async findOneById(
    id: string | number,
    relation?: string[]
  ): Promise<T> {
    const options: any = { where: { id: id }, relations: relation || [] };
    return this.repository.findOne(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(filterCondition);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<any> {
    const data = await this.repository.find(options);
    const count = await this.repository.count(options);
    return { count: count, docs: data };
  }

  public async remove(id: string): Promise<void> {
    const options: any = { where: { id: id } };
    const entity = await this.findByCondition(options);
    if (entity) {
      await this.repository.remove(entity);
    }
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<any> {
    const data = await this.repository.find(relations);
    const count = await this.repository.count({ where: relations.where });
    return { count: count, docs: data };
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return this.repository.preload(entityLike);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  public async updateById(id: string | number, data: any): Promise<any> {
    await this.repository.update(id, { ...data, updatedAt: dateTime });
    return await this.findOneById(id);
  }

  public async updateByOption(option: any, data: any): Promise<any> {
    await this.repository.update(option, { ...data, updatedAt: dateTime });
    return this.findOneById(option);
  }

  public async deleteById(
    id: string | number,
    data: QueryDeepPartialEntity<T>
  ): Promise<any> {
    await this.updateById(id, data);
    return await this.findOneById(id);
  }

  public async deleteByOption(
    option: any,
    data: QueryDeepPartialEntity<T>
  ): Promise<any> {
    await this.updateByOption(option, { ...data, updatedAt: dateTime });
    return await this.findOneById(option);
  }

  public async restoreById(
    id: string | number,
    data: QueryDeepPartialEntity<T>
  ): Promise<any> {
    await this.updateById(id, data);
    return await this.findOneById(id);
  }

  public async restoreByOption(
    option: any,
    data: QueryDeepPartialEntity<T>
  ): Promise<any> {
    await this.updateByOption(option, { ...data, updatedAt: dateTime });
    return await this.findOneById(option);
  }
}
