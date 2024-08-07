import { DeepPartial } from "typeorm";

export interface BaseRepository<T> {
  create(data: DeepPartial<T>): Promise<T>;
  findAll(filter: any, options?: any): Promise<T>;
  findOne(filter: any, options?: any): Promise<T>;
  update(options: any, data: any): Promise<T>;
  updateById(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
}
