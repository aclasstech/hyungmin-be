export enum ErrorEnum {
  DEFAULT = "0:Lỗi không xác định",
  SERVER_ERROR = "500:Lỗi cần khắc phục, thử lại sau",

  ROLE_EXISTS = "204:Role đã tồn tại",
  ROLE_NOT_FOUND = "404:Role không tồn tại",

  ADDRESS_EXISTS = "204:Role đã tồn tại",
  ADDRESS_NOT_FOUND = "404:Không tìm thấy địa chỉ",

  INVALIDE_TOKEN = "400:Token đã hết hạn",

  USER_EXISTS = "204:Người dùng đã tồn tại",
  INVALID_USERNAME_PASSWORD = "1003:Mật khẩu không đúng",
  PASSWORD_MISMATCH = "400:Mật khẩu không khớp",
  USER_NOT_FOUND = "404:Người dùng không tồn tại",
  INVALID_LOGIN = "400:Đăng nhập thất bại",
  ACCOUNT_LOGGED_IN_ELSEWHERE = "400:Tài khoản đã được đăng nhập ở thiết bị khác",
  NO_PERMISSION = "401:Không có quyền truy cập",
  INVALID_VERIFICATION_CODE = "400:Mã xác nhận không đúng",
  REQUESTED_RESOURCE_NOT_FOUND = "404: Dữ liệu truy vấn không tồn tại",

  TOO_MANY_REQUESTS = "401:Quá số lượt thực hiện",
  MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY = "401:Giới hạn 5 lượt 1 ngày",
  VERIFICATION_CODE_SEND_FAILED = "400:Lỗi gửi mã xác thực",

  FACILITY_EXISTS = "204:Cơ sở đã tồn tại",
  FACILITY_NOT_FOUND = "404:Cơ sở không tồn tại",
}
