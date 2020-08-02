export interface IArticleEntity {
  title: string;
  body: string;
  urlPath: string;
  tags: string[];
  createDate?: string;
  timesForRead?: number;
  countOfViews?: number;
  isHidden?: boolean;
}

export class ArticleEntity implements IArticleEntity {
  private static WORDS_PER_MINUTE = 200;

  public static getReadTime = (article: ArticleEntity): number =>
    Math.ceil(
      article.body?.split(' ').length / ArticleEntity.WORDS_PER_MINUTE,
    ) | 0;

  constructor(
    public readonly title: string,
    public readonly body: string,
    public readonly urlPath: string,
    public readonly tags: string[],
    public readonly createDate?: string,
    public readonly timesForRead?: number,
    public readonly countOfViews?: number,
    public readonly isHidden?: boolean,
  ) {}
}
