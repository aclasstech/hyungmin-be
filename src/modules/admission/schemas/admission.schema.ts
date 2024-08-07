import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CommonSchema } from "~/common/entity/common.entity";
import { Term } from "./term.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type AdmissionDocument = Admission & Document;

@Schema()
export class Admission extends CommonSchema {
  @ApiProperty()
  @Prop({ required: false })
  name: string;

  @ApiProperty()
  @Prop({ required: false })
  status: string;

  @ApiProperty({ type: [String] })
  @Prop({ default: [] })
  terms: Term[];
}

export const AdmissionSchema = SchemaFactory.createForClass(Admission);
