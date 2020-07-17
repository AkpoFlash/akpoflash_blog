import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  private static WORDS_PER_MINUTE = 200;

  public static getReadTime = (article: Article): number =>
    Math.ceil(article.body?.split(' ').length / Article.WORDS_PER_MINUTE) | 0;

  @Prop({ required: true })
  title: string;

  @Prop()
  body: string;

  @Prop()
  comments: [{ username: string; body: string; date: Date }];

  @Prop()
  date: Date;

  @Prop()
  hidden: boolean;

  @Prop()
  view: number;

  @Prop()
  readTimes: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
