import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GoogleTokenDto {
  @ApiProperty({
    description: 'The google token',
    example: 'my-google-token',
  })
  @IsNotEmpty()
  token: string;
}
