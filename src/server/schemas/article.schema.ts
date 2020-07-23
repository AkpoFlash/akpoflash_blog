import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IArticleEntity } from '../domains/entities/article.entity';

@Schema()
export class Article extends Document implements IArticleEntity {
  @Prop({ required: true })
  title: string;

  @Prop()
  body: string;

  @Prop()
  comments: [{ username: string; body: string; date: string }];

  @Prop()
  createDate: string;

  @Prop()
  isHidden: boolean;

  @Prop()
  countOfViews: number;

  @Prop()
  timesForRead: number;

  @Prop()
  tags: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
