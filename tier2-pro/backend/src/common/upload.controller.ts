import { Controller, Post, UseInterceptors, UploadedFile, MaxFileSizeValidator, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Upload')
@Controller('v1/upload')
export class UploadController {
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB max
        new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|pdf|doc|docx|xlsx)$/i }),
      ],
    })) file: Express.Multer.File,
  ) {
    // File validation OK — store logic here
    return { success: true, filename: file.originalname, size: file.size, mimetype: file.mimetype };
  }
}
