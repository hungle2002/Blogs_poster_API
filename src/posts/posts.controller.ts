import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /*
     * Injecting the PostsService
     */
    private readonly postsService: PostsService,
  ) {}

  @Get('/:userId')
  public getPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postsService.findAllByUserId(userId, postQuery);
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
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.create(user, createPostDto);
  }

  @ApiBody({
    type: PatchPostDto,
    description: 'The data to update a post',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @ApiOperation({
    summary: 'Delete a blog post',
  })
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
