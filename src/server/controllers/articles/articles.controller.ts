import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ArticlesService } from '../../services/articles/articles.service';
import { Article } from '../../schemas/article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles(): Promise<Article[]> {
    return this.articlesService.getAll().catch(err => err);
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string): Promise<Article> {
    return this.articlesService.getById(id).catch(err => err);
  }

  @Post()
  async addArticle(@Body() article: Article): Promise<Article> {
    return this.articlesService.addNew(article).catch(err => err);
  }

  @Put(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() article: Article,
  ): Promise<Article> {
    return this.articlesService.update(id, article).catch(err => err);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string): void {
    this.articlesService.delete(id);
  }
}
