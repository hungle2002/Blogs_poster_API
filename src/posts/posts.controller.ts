import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  /*
   * Injecting the PostsService
   */
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId')
  public getPost(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAllByUserId(userId);
  }

  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'The data to create a new post',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiBody({
    type: PatchPostDto,
    description: 'The data to update a post',
  })
  @Patch('/:id')
  public updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchPostDto: PatchPostDto,
  ) {
    console.log(patchPostDto);
    return `This action updates a #${id} post`;
  }
}
