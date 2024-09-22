import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  /*
   * Injecting the PostsService
   */
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId')
  public getPost(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAllByUserId(userId);
  }
}
