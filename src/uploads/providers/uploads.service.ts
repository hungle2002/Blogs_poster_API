import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/file-type.enum';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * Injecting the upload-to-aws provider
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,

    /**
     * Injecting the configService
     */
    private readonly configService: ConfigService,

    /**
     * Injecting the uploads repository
     */
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    // throw error for unsupported MIME type
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Unsupported file type');
    }

    try {
      // Upload to aws s3 bucket
      const name = await this.uploadToAwsProvider.fileUpload(file);

      const uploadType: UploadFile = {
        name,
        path: `https://${this.configService.get('appConfig.awsCloudfrontUrl')}/${name}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      // Save to database
      const upload = this.uploadsRepository.create(uploadType);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
