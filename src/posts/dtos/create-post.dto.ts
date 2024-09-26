import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  MinLength,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { statusType } from '../enums/statusType.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My first post',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: 'Possible values: post, page, story, series',
    example: 'post',
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'The slug of the post',
    example: 'my-first-post',
  })
  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug should be all small letter and uses "-" as separator. For example: my-url',
  })
  slug: string;

  @ApiProperty({
    enum: statusType,
    description: 'Possible values: draft, scheduled, review, published',
    example: 'draft',
  })
  @IsEnum(statusType)
  @IsNotEmpty()
  status: statusType;

  @ApiPropertyOptional({
    description: 'The content of the post',
    example: 'This is the content of my first post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialized JSON object else a validation error will be thrown',
    example:
      '{ "type": "object", "properties": { "title": { "type": "string" } } }',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The featured image URL of the post',
    example: 'https://www.example.com/featured-image.jpg',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The publish date of the post',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  // @Type(() => Date)
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passed as a string values',
    example: ['nestjs', 'typescript'],
  })
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'The meta options of the post',
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifier for your meta option',
          example: 'sideBarEnable',
        },
        value: {
          type: 'any',
          description: 'Any value you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
