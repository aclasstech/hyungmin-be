import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { Inject, Injectable } from "@nestjs/common";

import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import dayjs from "dayjs";

import Redis from "ioredis";
import { AppConfig, IAppConfig } from "~/config";
import { BusinessException } from "~/common/exceptions/biz.exception";
import { ErrorEnum } from "~/constants/error-code.constant";
import { randomValue } from "~/utils";

@Injectable()
export class MailerService {
  constructor(
    @Inject(AppConfig.KEY) private appConfig: IAppConfig,
    @InjectRedis() private redis: Redis,
    private mailerService: NestMailerService
  ) {}

  async log(to: string, code: string, ip: string) {
    const getRemainTime = () => {
      const now = dayjs();
      return now.endOf("day").diff(now, "second");
    };

    await this.redis.set(`captcha:${to}`, code, "EX", 60 * 5);

    const limitCountOfDay = await this.redis.get(`captcha:${to}:limit-day`);
    const ipLimitCountOfDay = await this.redis.get(`ip:${ip}:send:limit-day`);

    await this.redis.set(`ip:${ip}:send:limit`, 1, "EX", 60);
    await this.redis.set(`captcha:${to}:limit`, 1, "EX", 60);
    await this.redis.set(
      `captcha:${to}:send:limit-count-day`,
      limitCountOfDay,
      "EX",
      getRemainTime()
    );
    await this.redis.set(
      `ip:${ip}:send:limit-count-day`,
      ipLimitCountOfDay,
      "EX",
      getRemainTime()
    );
  }

  async checkCode(to: any, code: any) {
    const ret = await this.redis.get(`captcha:${to}`);
    if (ret !== code)
      throw new BusinessException(ErrorEnum.INVALID_VERIFICATION_CODE);

    await this.redis.del(`captcha:${to}`);
  }

  async checkLimit(to: any, ip: any) {
    const LIMIT_TIME = 5;

    // Hạn chế IP
    const ipLimit = await this.redis.get(`ip:${ip}:send:limit`);
    if (ipLimit) throw new BusinessException(ErrorEnum.TOO_MANY_REQUESTS);

    // Giới hạn chỉ nhận được 1 tin nhắn mỗi phút
    const limit = await this.redis.get(`captcha:${to}:limit`);
    if (limit) throw new BusinessException(ErrorEnum.TOO_MANY_REQUESTS);

    // Mỗi người có thể nhận 5 tin mỗi ngày
    let limitCountOfDay: string | number = await this.redis.get(
      `captcha:${to}:limit-day`
    );
    limitCountOfDay = limitCountOfDay ? Number(limitCountOfDay) : 0;
    if (limitCountOfDay > LIMIT_TIME) {
      throw new BusinessException(
        ErrorEnum.MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY
      );
    }

    // Một ip chỉ có thể gửi 5 tin mỗi ngày
    let ipLimitCountOfDay: string | number = await this.redis.get(
      `ip:${ip}:send:limit-day`
    );
    ipLimitCountOfDay = ipLimitCountOfDay ? Number(ipLimitCountOfDay) : 0;
    if (ipLimitCountOfDay > LIMIT_TIME) {
      throw new BusinessException(
        ErrorEnum.MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY
      );
    }
  }

  async send(
    to: any,
    subject: any,
    content: string,
    type: "text" | "html" = "text"
  ): Promise<any> {
    if (type === "text") {
      return this.mailerService.sendMail({
        to,
        subject,
        text: content,
      });
    } else {
      return this.mailerService.sendMail({
        to,
        subject,
        html: content,
      });
    }
  }

  async sendVerificationCode(to: any, code = randomValue(4, "1234567890")) {
    const subject = `[${this.appConfig.name}] Mã xác thực`;

    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: "./verification-code-zh",
        context: {
          code,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BusinessException(ErrorEnum.VERIFICATION_CODE_SEND_FAILED);
    }

    return {
      to,
      code,
    };
  }
}
