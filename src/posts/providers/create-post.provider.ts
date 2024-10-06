import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreatePostProvider {
  constructor(
    /**
     * Injecting the UsersService
     */
    private readonly usersService: UsersService,

    /**
     * Injecting the TagService
     */
    private readonly tagService: TagsService,

    /**
     * Injecting the posts repository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}
  /**
   * Create a new post
   * @param createPostDto
   * @returns Post
   */

  public async create(user: ActiveUserData, createPostDto: CreatePostDto) {
    // Find athor from database based on the author id
    let author = undefined;
    let tags = undefined;
    try {
      author = await this.usersService.findOneById(user.sub);
      // Find list of tags
      tags = await this.tagService.findMultipleTag(createPostDto.tags);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Checking if all tags exist
    if (!tags || tags.length !== createPostDto.tags.length) {
      throw new BadRequestException('There is a tag that does not exist');
    }

    // Create post
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      // Return the post
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique',
      });
    }
  }
}
