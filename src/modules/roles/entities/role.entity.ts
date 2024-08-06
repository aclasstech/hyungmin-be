import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { ROLE, STATUS } from "~/constants/enum.constant";

import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "~/common/entity/common.entity";
import { Expose } from "class-transformer";

export const GROUP_ROLE = "group_roles";

@Entity({ name: "roles" })
export class RoleEntity extends CommonEntity {
  @ApiProperty({ description: "Tên role" })
  @Column({ unique: true, type: "enum", enum: ROLE })
  @Expose({ groups: [GROUP_ROLE] })
  name: string;

  @ApiProperty({ description: "Trạng thái" })
  @Column({ type: "enum", enum: STATUS, default: STATUS.ENABLE })
  @Expose({ groups: [GROUP_ROLE] })
  status: string;
}
