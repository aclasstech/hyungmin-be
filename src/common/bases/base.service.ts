import { BaseRepository } from "./base.repository";
import { Injectable } from "@nestjs/common";
import { Document } from "mongoose";
import { BaseResponse } from "./base.response";

@Injectable()
export abstract class BaseService<T extends Document> {
  private response;

  constructor(private readonly repository: BaseRepository<T>) {
    this.response = new BaseResponse();
  }

  public async save(data: any): Promise<T> {
    const result = await this.repository.create(data);
    return await this.response.get(result);
  }

  public async find(filter: any = {}, options: any = {}): Promise<any> {
    const result = await this.repository.find(filter, options);
    return await this.response.get(result);
  }

  public async findOne(
    filter: any = {},
    options: { populate?: string | string[] } = {}
  ): Promise<T> {
    let query = await this.repository.findOne(filter);
    if (options.populate) query = query.populate(options.populate);
    const result = await query.exec();
    return await this.response.get(result);
  }

  public async update(options: any, data: any): Promise<any> {
    const result = await this.repository.update(options, data);
    return await this.response.get(result);
  }

  public async updateById(id: string, data: any): Promise<any> {
    const result = await this.repository.updateById(id, data);
    return await this.response.get(result);
  }

  public async delete(id: string): Promise<any> {
    await this.repository.delete(id);
    return { message: `ID ${id} deleted succesfully` };
  }
}
