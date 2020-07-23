import { ArticleEntity } from '../entities/article.entity';

export interface IArticlePort {
  getAll?: () => ArticleEntity[];
  getById?: (id: string) => ArticleEntity;
  add?: (article: ArticleEntity) => ArticleEntity;
  update?: (id: string, article: ArticleEntity) => void;
  delete?: (id: string) => void;
}
