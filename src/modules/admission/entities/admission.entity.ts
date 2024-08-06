import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";
import { CommonEntity } from "~/common/entity/common.entity";


@Entity({ name: "admission" })
export class AdmissionEntity extends CommonEntity {
  @ApiProperty({ nullable: true, description: "Tên kỳ" })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ nullable: true, description: "Trạng thái" })
  @Column({ nullable: true })
  status: string;

  @ApiProperty({ nullable: true, type: [Object], description: "Danh sách kỳ" })
  @Column('jsonb',{ nullable: true })
  terms: {
    title: string;
    time: string;
    redirect: string;
    titleRedirect: string;
    type: TermType;
  }[];
}