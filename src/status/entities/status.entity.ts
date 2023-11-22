import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Status {
  @Field()
  id: number;

  @Field()
  code: number;
}
