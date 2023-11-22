import { Query, Resolver } from '@nestjs/graphql';
import { Mutation, Args } from '@nestjs/graphql';
import { FileValidationPipe } from 'src/pipes/file-validation.pipe';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import { UploadFileService } from './upload-file.service';

@Resolver()
export class UploadFileResolver {
  constructor(private readonly uploadService: UploadFileService) {}

  @Query(() => String)
  async getName(): Promise<string> {
    return 'Lenin';
  }

  @Mutation(() => Boolean, { name: 'uploadFile' })
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload }, FileValidationPipe)
    file: Upload,
  ) {
    const upload: Upload = await file;
    this.uploadService.processFile(upload.file);
  }
}
