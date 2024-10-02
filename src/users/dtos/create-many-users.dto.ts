import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

export class CreateManyUsersDto {
  @ApiProperty({
    type: 'array',
    required: true,
    description: 'List of users to create',
    items: {
      type: 'User',
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
