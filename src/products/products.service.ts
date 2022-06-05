import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { query } from '../auth/constants';
import { ProductModel } from 'src/database/models/product.model';
import { Request } from 'express';

@Injectable()
export class ProductsService {
  constructor() {} // @Inject('ProductModel') private modelClass: ModelClass<ProductModel>,

  findAll(request: Request) {
    const pageNo = request.query.page ? request.query.page : query.page;
    const pageLimit = request.query.limit ? request.query.limit : query.limit;
    let term = request.query.term;
    const categoryId = request.query.category_id;

    term = term ? '%' + term + '%' : '';

    let data = ProductModel.query()
      .whereNotDeleted()
      .select('products.*', 'category.name as category')
      .joinRelated('category');

    if (term != '') {
      data = data
        .where('products.name', 'ILike', term)
        .orWhere('barcode', 'ILike', term);
    }
    if (categoryId != '') {
      data = data.where('category_id', categoryId);
    }

    return data.page(Number(pageNo) - 1, pageLimit);
  }

  list(search: string, id: number) {
    if (id > 0) {
      return ProductModel.query()
        .where('id', id)
        .select('id', 'name', 'barcode');
    }

    if (!search) {
      return ProductModel.query().select('id', 'name', 'barcode');
    }

    return ProductModel.query()
      .select('id', 'name', 'barcode')
      .where('name', 'ILike', '%' + search + '%')
      .orWhere('barcode', 'ILike', '%' + search + '%');
  }

  findOneById(id: number) {
    return ProductModel.query().findById(id);
  }

  findOne(barcode: string) {
    return ProductModel.query().findOne({ barcode });
  }

  async create(props: Partial<ProductModel>) {
    props.colors = JSON.stringify(props.colors);
    props.sizes = JSON.stringify(props.sizes);

    try {
      return await ProductModel.query().insert(props).returning('*');
    } catch (err) {
      console.log('err: ');
      console.log(err.data);
    }
  }

  update(id: number, props: Partial<ProductModel>) {
    props.colors = JSON.stringify(props.colors);
    props.sizes = JSON.stringify(props.sizes);

    return ProductModel.query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  async delete(id: number) {
    const data = await ProductModel.query().findOne({ id });
    return await data.$query().delete();
  }

  // delete(id: number) {
  //   return transaction(ProductModel, async (_, trx) => {
  //     return ProductModel
  //       .query()
  //       .deleteById(id)
  //       .returning('*')
  //       .first()
  //       .transacting(trx);
  //   });
  // }
}
