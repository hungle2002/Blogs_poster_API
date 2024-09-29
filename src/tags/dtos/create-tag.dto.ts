import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  desciption?: string;

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
}
