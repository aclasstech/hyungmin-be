import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import { TERM_TYPE } from "~/constants/enum.constant";

export type TermDocument = Term & Document;

@Schema()
export class Term {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  time: string;

  @ApiProperty()
  @Prop({ required: true })
  redirect: string;

  @ApiProperty()
  @Prop({ required: true })
  titleRedirect: string;

  @ApiProperty()
  @Prop({ required: true, enum: TERM_TYPE })
  type: TERM_TYPE;
}

export const TermSchema = SchemaFactory.createForClass(Term);
