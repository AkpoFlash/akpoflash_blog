export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export class FileEntity implements IFile {
  public static ENCODING = 'utf8';

  constructor(
    public readonly fieldname: string,
    public readonly originalname: string,
    public readonly encoding: string,
    public readonly mimetype: string,
    public readonly size: number,
    public readonly buffer: Buffer,
  ) {}
}
