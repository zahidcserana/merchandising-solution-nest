import { BaseModel } from './base.model';

export class ProductModel extends BaseModel {
  static tableName = 'products';

  name: string;
  composition: string;
  price: number;
  status: string;
  variants: string;
  colors: string;
  sizes: string;
  quantity: number;
  po_quantity: number;
  ready_quantity: number;
  delivered_quantity: number;
  category_id: number;
  barcode: string;
}
