import { ArticleEntity } from 'domains/entities/article.entity';
import { IArticlePort } from '../ports/article.port';

export class ArticleUseCase implements IArticlePort {
  add(article: ArticleEntity): ArticleEntity {
    return {
      ...article,
      createDate: new Date().toISOString(),
      timesForRead: ArticleEntity.getReadTime(article),
    };
  }
}

export const ArticleUseCaseSymbol = Symbol('ArticleUseCase');
