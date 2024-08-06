import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, from } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable()
export class FastifyFileInterceptor implements NestInterceptor {
  constructor(private readonly fieldName: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const parts = request.parts();

    const parseMultipart = async () => {
      const files = {};
      const fields = {};

      for await (const part of parts) {
        if (part.file) {
          const buffers = [];
          let fileSize = 0;
          for await (const chunk of part.file) {
            buffers.push(chunk);
            fileSize += chunk.length;
          }
          files[part.fieldname] = {
            buffer: Buffer.concat(buffers),
            originalname: part.filename,
            mimetype: part.mimetype,
            size: fileSize,
          };
        } else {
          fields[part.fieldname] = part.value;
        }
      }

      return { files: files[this.fieldName], fields };
    };

    return from(parseMultipart()).pipe(
      switchMap(({ files, fields }) => {
        request[this.fieldName] = files;
        request.body = fields;
        return next.handle();
      })
    );
  }
}
