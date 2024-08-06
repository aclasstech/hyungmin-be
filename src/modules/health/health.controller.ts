import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  DiskHealthIndicator,
  HealthCheck,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import { Public } from "~/common/decorators";

@ApiTags("Health Check")
@Controller("health")
export class HealthController {
  constructor(
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator
  ) {}

  @Public()
  @Get("database")
  @HealthCheck()
  async checkDatabase() {
    return this.db.pingCheck("database");
  }

  @Public()
  @Get("memory-heap")
  @HealthCheck()
  async checkMemoryHeap() {
    return this.memory.checkHeap("memory-heap", 200 * 1024 * 1024);
  }

  @Public()
  @Get("memory-rss")
  @HealthCheck()
  async checkMemoryRSS() {
    return this.memory.checkRSS("memory-rss", 200 * 1024 * 1024);
  }

  @Public()
  @Get("disk")
  @HealthCheck()
  async checkDisk() {
    return this.disk.checkStorage("disk", {
      thresholdPercent: 0.75,
      path: "/",
    });
  }
}
