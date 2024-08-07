import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment-timezone";

export interface CommonDocument extends Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class CommonSchema {
  @Prop({ type: String, auto: true })
  id: string;

  @Prop({
    type: Date,
    default: () => moment.tz(Date.now(), "Asia/Ho_Chi_Minh").utc(true).toDate(),
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: () => moment.tz(Date.now(), "Asia/Ho_Chi_Minh").utc(true).toDate(),
  })
  updatedAt: Date;
}

export const CommonSchemaFactory = SchemaFactory.createForClass(CommonSchema);
