import { ApiProperty } from '@nestjs/swagger';

export class CreateAdmissionDto {
  @ApiProperty({ description: 'Tên kỳ' })
  name: string;

  @ApiProperty({ description: 'Trạng thái' })
  status: string;

  @ApiProperty({ type: [Object], description: 'Danh sách kỳ' })
  terms: {
    title: string;
    time: string;
    redirect: string;
    titleRedirect: string;
    type: TermType;
  }[];
}