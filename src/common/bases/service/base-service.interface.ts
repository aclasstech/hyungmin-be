import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";

import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface BaseService<T> {
  create(data: any): Promise<T>;
  findOneById(id: string | number, relation?: string[]): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<any>;
  delete(id: string | number): Promise<void>;
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
}
