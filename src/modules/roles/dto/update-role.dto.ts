import { IsEnum, IsNotEmpty } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { CreateRoleDto } from "./create-role.dto";
import { PartialType } from "@nestjs/mapped-types";
import { ROLE } from "~/constants/enum.constant";

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ description: "Tên role" })
  @IsEnum(ROLE)
  @IsNotEmpty({ message: "Không được bỏ trống tên role" })
  name: string;
}
