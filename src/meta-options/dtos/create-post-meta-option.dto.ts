import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionDto {
  @ApiProperty({
    description: 'The meta value of the post',
    example:
      '{ "metaValue" : "{"sidebarEnabled": true, "footerActive": true}" }',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
