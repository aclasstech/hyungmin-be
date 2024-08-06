import { IsArray, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { PagerDto } from "~/common/dto/pager.dto";

export class LoginLogQueryDto extends PagerDto {
  @ApiProperty({ description: "Người truy cập" })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ description: "IP" })
  @IsOptional()
  @IsString()
  ip?: string;

  @ApiProperty({ description: "Địa chỉ" })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: "Thời gian" })
  @IsOptional()
  @IsArray()
  time?: string[];
}
