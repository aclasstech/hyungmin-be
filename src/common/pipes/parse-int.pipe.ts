import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = Number.parseInt(value, 10);

    if (Number.isNaN(val))
      throw new BadRequestException("Xác thực Id không thành công");

    return val;
  }
}
