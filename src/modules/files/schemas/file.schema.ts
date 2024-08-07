import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop()
  fileName: string;

  @Prop()
  fileUrl: string;

  @Prop()
  expiredAt: Date;

  @Prop()
  originalname: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
