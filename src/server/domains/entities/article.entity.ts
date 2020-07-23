export interface IArticleEntity {
  title: string;
  body: string;
  createDate: string;
  isHidden: boolean;
  countOfViews: number;
  timesForRead: number;
  tags: string[];
}

export class ArticleEntity implements IArticleEntity {
  private static WORDS_PER_MINUTE = 200;

  public static getReadTime = (article: ArticleEntity): number =>
    Math.ceil(
      article.body?.split(' ').length / ArticleEntity.WORDS_PER_MINUTE,
    ) | 0;

  constructor(
    public readonly body: string,
    public readonly countOfViews: number,
    public readonly createDate: string,
    public readonly isHidden: boolean,
    public readonly tags: string[],
    public readonly timesForRead: number,
    public readonly title: string,
  ) {}
}
