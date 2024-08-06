import { IsNotEmpty, IsString, Matches } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({ uniqueItems: true, description: "Số điện thoại" })
  @IsNotEmpty({ message: "Không được bỏ trống số điện thoại" })
  @IsString()
  @Matches(/(\+84|0)(3|5|7|8|9)\d{8}/, {
    message: "Số điện thoại không đúng định dạng",
  })
  phoneNumber: string;

  @ApiProperty({ description: "Mật khẩu" })
  @IsNotEmpty({ message: "Không được bỏ trống mật khẩu" })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Mật khẩu bao gồm ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
    }
  )
  password: string;
}

export class PasswordUpdateDto {
  @ApiProperty({ description: "Mật khẩu mới" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Mật khẩu bao gồm ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
    }
  )
  password: string;
}
