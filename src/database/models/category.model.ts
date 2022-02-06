import { BaseModel } from './base.model';

export class CategoryModel extends BaseModel {
  static tableName = 'categories';

  name: string;
  slug: string;
}
