import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesService } from '../../services/articles/articles.service';
import { ArticlesController } from '../../controllers/articles/articles.controller';
import { ArticleSchema } from '../../schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema, collection: 'articles' },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
