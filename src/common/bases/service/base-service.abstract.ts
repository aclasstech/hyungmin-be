import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import { BaseService } from "./base-service.interface";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { dateTime } from "src/common/decorators/date-time.decorator";
import { BaseRepository } from "../repository/base.interface";

export abstract class BaseAbstractService<T> implements BaseService<T> {
  constructor(private readonly repository: BaseRepository<T>) {}

  public async create(data: any): Promise<T> {
    return this.repository.create(data);
  }

  public async findOneById(
    id: string | number,
    relation?: string[]
  ): Promise<T> {
    const options: any = { where: { id: id }, relations: relation || [] };
    return this.repository.findOne(options);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<any> {
    const data = await this.repository.findAll(options);
    return { data: data };
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
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
