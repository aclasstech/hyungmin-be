import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
