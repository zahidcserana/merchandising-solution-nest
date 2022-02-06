import { BaseModel } from './base.model';

export class ColorModel extends BaseModel {
  static tableName = 'colors';

  name: string;
  slug: string;
}
