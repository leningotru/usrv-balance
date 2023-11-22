import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';
import { validateRow } from '../Utils/data-utils';
import * as csv from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class UploadFileService {
  processFile(upload: FileUpload): Promise<any> {
    {
      try {
        const rows: CsvRow[] = [];
        const stream: Readable = upload.createReadStream();

        return new Promise<void>((resolve, reject) => {
          stream
            .pipe(csv())
            .on('data', (row: CsvRow) => {
              validateRow(row, rows);
            })
            .on('end', () => {
              console.log('END_OF_STREAM');
              resolve();
            })
            .on('error', (error) => {
              console.log('IMAGE_UPLOAD_ERROR', error);
              reject(false);
            });
        });
      } catch (error) {
        console.error('Error:', error);
        throw new Error(`Error validating the file ${error}`);
      }
    }
  }
}
