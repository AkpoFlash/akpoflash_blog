import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileEntity } from 'domains/entities/file.entity';
import { ArticlesService } from '../../services/articles/articles.service';
import { Article } from '../../schemas/article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles(@Query('tag') tag: string): Promise<Article[]> {
    return this.articlesService.getAll(tag).catch(err => err);
  }

  @Get('tags')
  async getTags(): Promise<string[]> {
    return this.articlesService.getAllTags().catch(err => err);
  }

  @Get(':urlPath')
  async getArticleByUrlPath(
    @Param('urlPath') urlPath: string,
  ): Promise<Article> {
    return this.articlesService.getByUrlPath(urlPath).catch(err => err);
  }

  @Post()
  @UseInterceptors(FileInterceptor('new_article'))
  uploadFile(@UploadedFile() file: FileEntity): Promise<any> {
    return this.articlesService.addNew(file).catch(err => err);
  }

  @Put(':urlPath')
  async updateArticle(
    @Param('urlPath') urlPath: string,
    @Body() article: Article,
  ): Promise<Article> {
    return this.articlesService.update(urlPath, article).catch(err => err);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string): void {
    this.articlesService.delete(id);
  }
}
