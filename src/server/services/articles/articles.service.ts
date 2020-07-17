import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../../schemas/article.schema';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleCollection: Model<Article>,
  ) {}

  addNew(article: Article): Promise<Article> {
    const addedArticle = new this.articleCollection({
      ...article,
      date: Date.now(),
      readTimes: Article.getReadTime(article),
    });
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
