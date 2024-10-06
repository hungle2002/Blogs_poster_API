import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(
    /**
     * Injecting tag service
     */
    private readonly tagsService: TagsService,
  ) {}

  @ApiOperation({
    summary: 'Get all tags',
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  @Get()
  public getTags() {
    return this.tagsService.getTags();
  }

  @ApiOperation({
    summary: 'Create a new tag',
  })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created',
  })
  @ApiBody({
    type: CreateTagDto,
    description: 'The data to create a new tag',
  })
  @Post()
  public createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({
    summary: 'Delete a tag',
  })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully deleted',
  })
  @Delete()
  public async delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  @ApiOperation({
    summary: 'Soft delete a tag',
  })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully deleted',
  })
  @Delete('soft-delete')
  public async softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softDelete(id);
  }
}
