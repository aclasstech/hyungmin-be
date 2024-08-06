import { DeepPartial, FindManyOptions, FindOneOptions, SelectQueryBuilder } from "typeorm";

import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T;
  save(data: DeepPartial<T>): Promise<T>;
  find(options?: FindManyOptions<T>): Promise<any>;
  remove(data: T): Promise<T>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  findOne(options: FindOneOptions<T>): Promise<T>;
  update(options: any, data: QueryDeepPartialEntity<T>): Promise<any>;
  count(options?: FindManyOptions<T>): Promise<number>;
  createQueryBuilder(alias: string): SelectQueryBuilder<T>;
}
