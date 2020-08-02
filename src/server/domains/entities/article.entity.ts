import { FileEntity } from './file.entity';

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
  private static TITLE_REGEX = /#+.+/;
  private static TITLE_HASH_REGEX = /#*/g;
  // todo fix this regex (bc [] - used for link in md)
  private static TAG_REGEX = /\[(\w+)\]/g;
  private static BODY_REGEX = /^\n(.|\s)*/gm;

  public static readonly getReadTime = (article: ArticleEntity): number =>
    Math.ceil(
      article.body?.split(' ').length / ArticleEntity.WORDS_PER_MINUTE,
    ) | 0;

  private static readonly getTitle = (article: string): string =>
    article
      .match(ArticleEntity.TITLE_REGEX)[0]
      ?.replace(ArticleEntity.TITLE_HASH_REGEX, '');

  private static readonly getBody = (article: string): string =>
    article.match(ArticleEntity.BODY_REGEX)[0];

  private static readonly getTags = (article: string): string[] => {
    const tagsIterator = article.matchAll(ArticleEntity.TAG_REGEX);
    const tags = [];
    for (let tag of tagsIterator) {
      tags.push(tag[1]);
    }
    return tags;
  };

  private static readonly getUrlPath = (file: FileEntity): string =>
    file.originalname?.split('.')[0];

  public static readonly getArticleFromFile = (
    file: FileEntity,
  ): ArticleEntity => {
    const stringFromFile = file.buffer.toString(FileEntity.ENCODING);

    const title = ArticleEntity.getTitle(stringFromFile);
    const body = ArticleEntity.getBody(stringFromFile);
    const urlPath = ArticleEntity.getUrlPath(file);
    const tags = ArticleEntity.getTags(stringFromFile);

    return new ArticleEntity(title, body, urlPath, tags);
  };

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
