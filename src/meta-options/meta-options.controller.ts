import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionDto } from './dtos/create-post-meta-option.dto';
import { MetaOptionsService } from './providers/meta-options.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('meta-options')
@ApiTags('MetaOptions')
export class MetaOptionsController {
  constructor(
    /**
     * Injecting the MetaOptionsService
     */
    private readonly metaOptionsService: MetaOptionsService,
  ) {}

  @ApiOperation({ summary: 'Create a new meta option' })
  @ApiResponse({
    status: 201,
    description: 'The new meta option has been successfully created',
  })
  @ApiBody({
    type: CreatePostMetaOptionDto,
    description: 'The data to create a new meta option',
  })
  @Post()
  public create(@Body() CreatePostMetaOptionDto: CreatePostMetaOptionDto) {
    return this.metaOptionsService.createMetaOption(CreatePostMetaOptionDto);
  }
}
