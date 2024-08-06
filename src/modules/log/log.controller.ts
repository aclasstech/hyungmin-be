import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { ApiResult } from "~/common/decorators/api-result.decorator";
import { ApiSecurityAuth } from "~/common/decorators/swagger.decorator";
import { Pagination } from "~/helper/paginate/pagination";

import { LoginLogQueryDto } from "./dto/log.dto";
import { LoginLogInfo } from "./models/log.model";
import { LoginLogService } from "./services/login-log.service";
import { Public } from "~/common/decorators";
import { AuthenticationGuard } from "../auth/guard/authentication.guard";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "~/common/decorators/custom.decorator";
import { ROLE } from "~/constants/enum.constant";

@ApiSecurityAuth()
@ApiTags("Logging")
@Controller("log")
export class LogController {
  constructor(private loginLogService: LoginLogService) {}

  @Public()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get("login/list")
  @ApiOperation({ summary: "Lấy danh sách người truy cập" })
  @ApiResult({ type: [LoginLogInfo], isPage: true })
  async loginLogPage(
    @Query() dto: LoginLogQueryDto
  ): Promise<Pagination<LoginLogInfo>> {
    return; //this.loginLogService.list(dto);
  }
}
