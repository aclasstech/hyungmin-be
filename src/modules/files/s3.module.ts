import { S3Client } from "@aws-sdk/client-s3";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [
    {
      provide: "S3Client",
      useFactory: (configService: ConfigService) => {
        return new S3Client({
          region: configService.get<string>("AWS_S3_REGION"),
          credentials: {
            accessKeyId: configService.get<string>("AWS_S3_ACCESS_KEY_ID"),
            secretAccessKey: configService.get<string>(
              "AWS_S3_SECRET_ACCESS_KEY"
            ),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ["S3Client"],
})
export class S3Module {}
