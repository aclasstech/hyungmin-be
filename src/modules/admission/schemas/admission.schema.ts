import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Admission {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  status: string;

  @Prop()
  terms: {
    title: string;
    time: string;
    redirect: string;
    titleRedirect: string;
    type: TermType;
  }[];
}

export const AdmissionSchema = SchemaFactory.createForClass(Admission);
