import { ApiProperty } from "@nestjs/swagger";

export class LoginLogInfo {
  @ApiProperty({ description: "uuid" })
  id: string;

  @ApiProperty({ description: "IP", example: "1.1.1.1" })
  ip: string;

  @ApiProperty({ description: "Địa chỉ" })
  address: string;

  @ApiProperty({ description: "Hệ điều hành", example: "Windows 10" })
  os: string;

  @ApiProperty({ description: "Trình duyệt", example: "Chrome" })
  browser: string;

  @ApiProperty({ description: "Người truy cập" })
  username: string;

  @ApiProperty({
    description: "Thời điểm truy cập",
    example: "2023-12-22 16:46:20.333843",
  })
  time: string;
}
