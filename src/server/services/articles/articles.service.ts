import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Article } from 'schemas/article.schema';
import {
  ArticleUseCase,
  ArticleUseCaseSymbol,
} from 'domains/usecases/article.usecase';
import { ArticleEntity } from 'domains/entities/article.entity';
import { FileEntity } from 'domains/entities/file.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleCollection: Model<Article>,
    @Inject(ArticleUseCaseSymbol)
    private readonly articleUseCase: ArticleUseCase,
  ) {}

  addNew(file: FileEntity): Promise<ArticleEntity> {
    const article = ArticleEntity.getArticleFromFile(file);
    const addedArticle = new this.articleCollection(
      this.articleUseCase.add(article),
    );
    return addedArticle.save();
  }

  getByUrlPath(urlPath: string): Promise<Article> {
    return this.articleCollection.findOne({ urlPath }).exec();
  }

  getAll(tag?: string): Promise<Article[]> {
    const condition = tag ? { tags: tag } : {};
    return this.articleCollection
      .find(condition)
      .sort({ createDate: -1 })
      .exec();
  }

  delete(id: string) {
    this.articleCollection.deleteOne({ _id: id }).exec();
  }

  update(urlPath: string, article: Article): Promise<Article> {
    return this.articleCollection.updateOne({ urlPath }, article).exec();
  }
}
