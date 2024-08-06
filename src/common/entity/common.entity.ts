import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
} from "typeorm";
import * as moment from "moment-timezone";

export abstract class CommonEntity extends BaseEntity {
  @ApiProperty({ description: "Id" })
  @PrimaryGeneratedColumn("uuid")
  id: string | number;

  @ApiProperty({ description: "Thời gian tạo" })
  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt: any;

  @ApiProperty({ description: "Thời gian cập nhật" })
  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt: any;

  @BeforeInsert()
  setCreateDate() {
    const vnTime = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");
    this.createdAt = vnTime.utc(true).toDate();
  }

  @BeforeUpdate()
  setUpdateDate() {
    const vnTime = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");
    this.updatedAt = vnTime.utc(true).toDate();
  }
}

export abstract class CompleteEntity extends CommonEntity {
  @ApiHideProperty()
  @Exclude()
  @Column({ name: "create_by", update: false, comment: "Người tạo" })
  createBy: number;

  @ApiHideProperty()
  @Exclude()
  @Column({ name: "update_by", comment: "Người cập nhật" })
  updateBy: number;

  @ApiProperty({ description: "Người tạo" })
  @VirtualColumn({
    query: (alias) =>
      `SELECT username FROM sys_user WHERE id = ${alias}.create_by`,
  })
  creator: string;

  @ApiProperty({ description: "Người cập nhật" })
  @VirtualColumn({
    query: (alias) =>
      `SELECT username FROM sys_user WHERE id = ${alias}.update_by`,
  })
  updater: string;
}
