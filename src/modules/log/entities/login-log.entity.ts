import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "~/common/entity/common.entity";

@Entity({ name: "sys_login_log" })
export class LoginLogEntity extends CommonEntity {
  @Column({ nullable: true })
  @ApiProperty({ description: "IP" })
  ip: string;

  @Column({ nullable: true })
  @ApiProperty({ description: "Địa chỉ" })
  address: string;

  @Column({ nullable: true })
  @ApiProperty({ description: "Nhà cung cấp" })
  provider: string;

  @Column({ length: 500, nullable: true })
  @ApiProperty({ description: "Trình duyệt" })
  ua: string;
}
