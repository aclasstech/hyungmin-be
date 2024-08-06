import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { Public } from "~/common/decorators";
import { FastifyFileInterceptor } from "~/common/interceptors/fastify-file.interceptors";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post("/upload")
  @UseInterceptors(new FastifyFileInterceptor("files"))
  async uploadFile(@UploadedFiles() files: Record<string, any>) {
    return this.filesService.uploadFiles(files, "btvn");
  }
}
