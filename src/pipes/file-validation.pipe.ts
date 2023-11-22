import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform(value) {
    if (!value.filename) throw new Error('File not provided');

    const filename = value.filename;
    const isFileFormatValid = this.validateFileFormat(filename, 'csv');

    if (!isFileFormatValid) throw new Error('File format not valid');
    return value;
  }
  validateFileFormat(filename: string, allowedFileFormat: string) {
    const fileParts = filename.split('.');
    const extension = fileParts[fileParts.length - 1];

    return allowedFileFormat === extension;
  }
}
