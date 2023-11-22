import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule, Query } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { UploadFileResolver } from './upload-file/upload-file.resolver';
import { UploadFileService } from './upload-file/upload-file.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService, UploadFileResolver, UploadFileService],
})
export class AppModule {}
