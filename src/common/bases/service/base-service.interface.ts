import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";

import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface BaseInterfaceService<T> {
  create(data: any): Promise<T>;
  save(data: DeepPartial<T>): Promise<T>;
  findOneById(id: string | number, relation?: string[]): Promise<T>;
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<any>;
  remove(id: string | number): Promise<void>;
  findWithRelations(relations: FindManyOptions<T>): Promise<any>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  findOne(options: FindOneOptions<T>): Promise<T>;
  updateById(
    id: string | number,
    data: QueryDeepPartialEntity<T>
  ): Promise<any>;
  updateByOption(options: any, data: QueryDeepPartialEntity<T>): Promise<any>;
  deleteById(
    id: string | number,
    data: QueryDeepPartialEntity<T>
  ): Promise<any>;
  deleteByOption(options: any, data: QueryDeepPartialEntity<T>): Promise<any>;
  count(options?: FindManyOptions<T>): Promise<number>;
}
