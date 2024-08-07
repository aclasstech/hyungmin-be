import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class LoginLog {
  @Prop()
  ip: string;

  @Prop()
  address: string;

  @Prop()
  provider: string;

  @Prop()
  ua: string;
}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);
