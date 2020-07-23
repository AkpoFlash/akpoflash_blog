import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Article } from '../../schemas/article.schema';
import {
  ArticleUseCase,
  ArticleUseCaseSymbol,
} from '../../domains/usecases/article.usecase';
import { ArticleEntity } from '../../domains/entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleCollection: Model<Article>,
    @Inject(ArticleUseCaseSymbol)
    private readonly articleUseCase: ArticleUseCase,
  ) {}

  addNew(article: ArticleEntity): Promise<ArticleEntity> {
    const addedArticle = new this.articleCollection(
      this.articleUseCase.add(article),
    );
    return addedArticle.save();
  }

  getById(id: string): Promise<Article> {
    return this.articleCollection.findById(id).exec();
  }

  getAll(): Promise<Article[]> {
    return this.articleCollection.find().exec();
  }

  delete(id: string) {
    this.articleCollection.deleteOne({ _id: id }).exec();
  }

  update(id: string, article: Article): Promise<Article> {
    return this.articleCollection.updateOne({ _id: id }, article).exec();
  }
}
