import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UAParser from "ua-parser-js";
import { getIpAddress } from "~/utils/ip.util";
import { LoginLogEntity } from "../entities/login-log.entity";
import { LoginLogInfo } from "../models/log.model";
import { BaseAbstractService } from "~/common/bases/service/base-service.abstract";
import { SystemLogRepositoryInterface } from "../interfaces/log.interface";

async function parseLoginLog(e: any, parser: UAParser): Promise<LoginLogInfo> {
  const uaResult = parser.setUA(e.login_log_ua).getResult();

  return {
    id: e.login_log_id,
    ip: e.login_log_ip,
    address: e.login_log_address,
    os: `${`${uaResult.os.name ?? ""} `}${uaResult.os.version}`,
    browser: `${`${uaResult.browser.name ?? ""} `}${uaResult.browser.version}`,
    username: e.user_username,
    time: e.login_log_created_at,
  };
}

@Injectable()
export class LoginLogService extends BaseAbstractService<LoginLogEntity> {
  constructor(
    @InjectRepository(LoginLogEntity)
    private readonly systemLogRepository: SystemLogRepositoryInterface
  ) {
    super(systemLogRepository);
  }

  async createSystemLog(
    uid: string | number,
    ip: string,
    ua: string
  ): Promise<void> {
    try {
      const address = await getIpAddress(ip);

      await this.create({
        ip: ip,
        ua: ua,
        address: address,
        staffId: uid,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
