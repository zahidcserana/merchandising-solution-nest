import { BaseModel } from './base.model';

export class SizeModel extends BaseModel {
  static tableName = 'sizes';

  name: string;
  slug: string;
}
