import { Injectable } from '@nestjs/common';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionDto } from '../dtos/create-post-meta-option.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * Injecting the MetaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}
  public async createMetaOption(
    createPostMetaOptionDto: CreatePostMetaOptionDto,
  ) {
    const newMetatOption = this.metaOptionsRepository.create(
      createPostMetaOptionDto,
    );
    return await this.metaOptionsRepository.save(newMetatOption);
  }
}
