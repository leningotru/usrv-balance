import { FileValidationPipe } from './file-validation.pipe';

describe('FileValidationPipe', () => {
  let fileValidationPipe: FileValidationPipe;

  beforeEach(() => {
    fileValidationPipe = new FileValidationPipe();
  });

  it('should throw an error if no filename is provided', async () => {
    await expect(fileValidationPipe.transform({})).rejects.toThrow(
      'File not provided',
    );
  });

  it('should throw an error if the file format is not valid', async () => {
    const invalidFile = { filename: 'file.txt' };
    await expect(fileValidationPipe.transform(invalidFile)).rejects.toThrow(
      'File format not valid',
    );
  });

  it('should pass if the file format is valid', async () => {
    const validFile = { filename: 'file.csv' };
    await expect(fileValidationPipe.transform(validFile)).resolves.toEqual(
      validFile,
    );
  });
});
