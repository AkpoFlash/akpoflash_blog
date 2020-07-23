import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesService } from '../../services/articles/articles.service';
import { ArticlesController } from '../../controllers/articles/articles.controller';
import { ArticleSchema } from '../../schemas/article.schema';
import {
  ArticleUseCase,
  ArticleUseCaseSymbol,
} from '../../domains/usecases/article.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema, collection: 'articles' },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    { provide: ArticleUseCaseSymbol, useClass: ArticleUseCase },
  ],
})
export class ArticlesModule {}
