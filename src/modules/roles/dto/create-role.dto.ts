import { IsEnum, IsNotEmpty } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";
import { ROLE } from "~/constants/enum.constant";

export class CreateRoleDto {
  @ApiProperty({ description: "Role ID" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ description: "Tên role" })
  @IsEnum(ROLE)
  @IsNotEmpty({ message: "Không được bỏ trống tên role" })
  name: string;
}
