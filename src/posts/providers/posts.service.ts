import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

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
  ) {}

  /**
   * Find all posts by user id
   * @param userId
   * @returns Post[]
   */
  public findAllByUserId(userId: number) {
    // Find the user
    const user = this.usersService.findOneById(userId);

    const posts = this.postsRepository.find();
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
    const tags = await this.tagService.findMultipleTag(patchPostDto.tags);

    // Find the Post
    const post = await this.postsRepository.findOneBy({ id: patchPostDto.id });

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
    return await this.postsRepository.save(post);
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
