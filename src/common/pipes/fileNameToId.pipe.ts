import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileNameToIdPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (!value) throw new HttpException(`provide file or image`, 500);
    return { ...value, filename: value.filename.split('.')[0] };
  }
}
