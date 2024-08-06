import { Injectable, Logger, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  private readonly loggerService: LoggerService;
  private readonly testing: boolean;

  constructor(private readonly configService: ConfigService) {
    this.loggerService = new Logger(AppService.name);
    this.testing = this.configService.get("testing");
  }
}
