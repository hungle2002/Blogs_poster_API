import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id?')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log('id: ', typeof id);
    console.log('limit: ', typeof limit);
    console.log('page: ', typeof page);
    return id;
  }

  @Post()
  public createUsers(@Body() body: any, @Ip() ip: string) {
    console.log(body);
    console.log(ip);
    return 'These are created users';
  }
}
