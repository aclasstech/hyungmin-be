import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { BaseInterfaceRepository } from "./base.interface";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface HasId {
  id: string | number;
}

export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  constructor(protected entity: Repository<T>) {}

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  public async find(options?: FindManyOptions<T>): Promise<any> {
    return await this.entity.find(options);
  }

  public async remove(data: T): Promise<T> {
    return await this.entity.remove(data);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(options);
  }

  public async update(
    options: any,
    data: QueryDeepPartialEntity<T>
  ): Promise<any> {
    return await this.entity.update(options, data);
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this.createQueryBuilder(alias);
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.entity.count(options);
  }
}
