import { Test, TestingModule } from '@nestjs/testing';
import { UploadFileResolver } from './upload-file.resolver';

describe.skip('UploadFileResolver', () => {
  let resolver: UploadFileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadFileResolver],
    }).compile();

    resolver = module.get<UploadFileResolver>(UploadFileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
