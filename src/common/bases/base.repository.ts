import { Model } from "mongoose";

export class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async create(data: any): Promise<any> {
    const createModel = new this.model(data);
    return await createModel.save();
  }

  public async findAll(
    filter: any = {},
    options: { populate?: string | string[] } = {}
  ): Promise<any> {
    let query = this.model.find(filter);
    if (options.populate) query = query.populate(options.populate);
    return await query.exec();
  }

  public async findOne(
    filter: any = {},
    options: { populate?: string | string[] } = {}
  ): Promise<any> {
    let query = this.model.findOne(filter);
    if (options.populate) query = query.populate(options.populate);
    return await query.exec();
  }

  public async update(options: any, data: any): Promise<any> {
    return this.model.updateOne(options, data, { new: true }).exec();
  }

  public async updateById(id: string, data: any): Promise<any> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public async delete(id: string): Promise<any> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
