import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting the UsersService
     */
    private readonly usersService: UsersService,
    /**
     * Injecting the posts repository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Injecting the TagService
     */
    private readonly tagService: TagsService,
    /**
     * Injecting the pagination provider
     */
    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Find all posts by user id
   * @param userId
   * @returns Post[]
   */
  public async findAllByUserId(
    userId: number,
    postQuery: GetPostsDto,
  ): Promise<Paginated<Post>> {
    // Find the user
    console.log(userId);

    const posts = await this.paginationProvider.paginateQuery(
      postQuery,
      this.postsRepository,
    );
    return posts;
  }

  /**
   * Create a new post
   * @param createPostDto
   * @returns Post
   */
  public async create(createPostDto: CreatePostDto) {
    // Find athor from database based on the author id
    const author = await this.usersService.findOneById(createPostDto.authorId);
    if (!author) {
      throw new Error('User not found');
    }

    // Find list of tags
    const tags = await this.tagService.findMultipleTag(createPostDto.tags);

    // Create post
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    // Return the post
    return this.postsRepository.save(post);
  }

  public async update(patchPostDto: PatchPostDto) {
    // Find the Tags (need to assign)
    let tags = undefined;
    try {
      tags = await this.tagService.findMultipleTag(patchPostDto.tags);
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
    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException('There is a tag that does not exist');
    }

    // Find the Post
    let post = undefined;
    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Handle post not found
    if (!post) {
      throw new BadRequestException('The post id does not exist');
    }

    // Update the properties
    post.title = patchPostDto.title ?? post.title;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Assign the new tags
    post.tags = tags;

    // Save the post and return
    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return post;
  }

  /**
   * Delete a post
   * @param id
   * @returns
   */
  public async delete(id: number) {
    // // Delete the post
    await this.postsRepository.delete(id);

    // Confirmation
    return { deleted: true, id };
  }
}
