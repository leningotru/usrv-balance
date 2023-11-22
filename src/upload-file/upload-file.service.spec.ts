import { Test, TestingModule } from '@nestjs/testing';
import { FileUpload, Upload } from 'graphql-upload-ts';
import { Readable } from 'stream';
import { UploadFileService } from './upload-file.service';
import * as csv from 'csv-parser';
jest.mock('csv-parser');

describe.skip('UploadFileService', () => {
  let service: UploadFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadFileService],
    }).compile();

    service = module.get<UploadFileService>(UploadFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process a valid file', async () => {
    const validCsvRow: CsvRow = {
      id: 1,
      balance: 100,
      account: 'INTERNAL',
      description: 'Desc',
      status: 'PENDING',
      date: new Date().toISOString(),
    };

    const test = (csv as jest.Mock).mockReturnValue(
      Readable.from([JSON.stringify(validCsvRow)]),
    );
    const validFileUpload: FileUpload = {
      fieldName: 'string',
      filename: 'valid.csv',
      mimetype: 'text/csv',
      encoding: 'utf-8',
      createReadStream: test,
    };
    await expect(service.processFile(validFileUpload)).resolves.toBeUndefined();
  });

  it('should reject if the file contains invalid data', async () => {
    const invalidCsvRow = {
      id: 'invalid',
      balance: 'not_a_number',
      account: 'INVALID',
      description: 'Invalid Desc',
      status: 'INVALID',
      date: 'invalid_date',
    };
    const test = (csv as jest.Mock).mockReturnValue(
      Readable.from([JSON.stringify(invalidCsvRow)]),
    );
    const invalidFileUpload: FileUpload = {
      fieldName: 'string',
      filename: 'invalid.csv',
      mimetype: 'text/csv',
      encoding: 'utf-8',
      createReadStream: test,
    };
    await expect(service.processFile(invalidFileUpload)).rejects.toThrowError();
  });
});
