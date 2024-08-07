import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { dateTimeZone } from "src/common/decorators/date-time.decorator";
import { BaseAbstractService } from "~/common/bases/service/base-service.abstract";
import { FileRepositoryInterface } from "./interfaces/file.interface";
import { BusinessException } from "~/common/exceptions/biz.exception";
import { File } from "./schemas/file.schema";

@Injectable()
export class FilesService extends BaseAbstractService<File> {
  private configS3: any;
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: FileRepositoryInterface,
    private readonly configService: ConfigService,
    @Inject("S3Client")
    private readonly s3Client: S3Client
  ) {
    super(filesRepository);
    this.configS3 = this.configService.getOrThrow("AWS_S3_PUBLIC_BUCKET");
  }

  async uploadFiles(files: Record<string, any>, part: string): Promise<any> {
    if (!files) {
      throw new NotFoundException("Files không tồn tại");
    }

    if (files.size > 25 * 1024 * 1024) {
      throw new BadRequestException(
        `File ${files.originalname} vượt quá 25Mb giới hạn`
      );
    }

    const fileType = files.mimetype.split("/")[1];
    const formattedNumber = Date.now().toString();

    const fileName = formattedNumber + "-" + dateTimeZone + "-" + fileType;
    const keyword = `${part}/${fileName}`;

    let contentType = `image/${fileType}`;
    if (fileType === "pdf") {
      contentType = `application/${fileType}`;
    }

    await this.uploadInS3(keyword, contentType, files.buffer);

    await this.filesRepository.create({
      fileName: keyword,
      originalname: files.originalname,
      fileUrl: "",
      expiredAt: null,
    });
    return await this.getFiles(keyword);
  }

  async getFiles(fileName: string): Promise<any> {
    if (!fileName) {
      throw new BusinessException("404:Tên file không được bỏ trống");
    }

    const command = await this.getFileInS3(fileName);

    const findImage = await this.filesRepository.findOne({
      fileName: fileName,
    });

    if (!findImage) {
      throw new BusinessException("404:Không tìm thấy file");
    }

    const currentDate = new Date();
    const dataDate = new Date(findImage.expiredAt);

    if (dataDate.getTime() <= currentDate.getTime()) {
      const newExpiredAt = new Date(
        currentDate.getTime() + 6 * 24 * 60 * 60 * 1000
      );

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 604800,
      });

      await this.filesRepository.update(
        { fileName: findImage.fileName },
        { fileUrl: url, expiredAt: newExpiredAt }
      );
    }
    return await this.filesRepository.findOne({ fileName: fileName });
  }

  async uploadInS3(key: string, contentType: string, body: any) {
    return await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configS3,
        Key: key,
        Body: body,
        ContentType: contentType,
      })
    );
  }

  async getFileInS3(key: string) {
    return await new GetObjectCommand({ Bucket: this.configS3, Key: key });
  }
}
