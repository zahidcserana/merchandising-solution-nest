import { Inject, Injectable, Req } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { query } from '../auth/constants';
import { VariantProductModel } from 'src/database/models/variant_product.model';
import { Request } from 'express';

@Injectable()
export class VariantProductsService {
  constructor() {} // private modelClass: ModelClass<VariantProductModel>, // @Inject('VariantProductModel')

  findAll(request: Request) {
    const pageNo = request.query.page ? request.query.page : query.page;
    const pageLimit = request.query.limit ? request.query.limit : query.limit;

    if (request.query.product_id != '') {
      return VariantProductModel.query()
        .withGraphFetched('[product, color, size]')
        .page(Number(pageNo) - 1, pageLimit)
        .where('product_id', request.query.product_id);
    }

    return VariantProductModel.query()
      .withGraphFetched('[product, color, size]')
      .page(Number(pageNo) - 1, pageLimit);
  }

  findOneById(id: number) {
    return VariantProductModel.query()
      .findById(id)
      .withGraphFetched('[product, color, size]');
  }

  findOne(barcode: string) {
    return VariantProductModel.query().findOne({ barcode });
  }

  async create(props: Partial<VariantProductModel>) {
    try {
      return await VariantProductModel.query().insert(props).returning('*');
    } catch (err) {
      console.log('err: ');
      console.log(err.data);
    }
  }

  async update(id: number, props: Partial<VariantProductModel>) {
    try {
      const data = await VariantProductModel.query().findOne({ id });

      return await data
        .$query()
        .update(props)
        .where({ id })
        .returning('*')
        .first();
    } catch (error) {
      console.log('err: ');
      console.log(error);
    }
  }

  async delete(id: number) {
    const data = await VariantProductModel.query().findOne({ id });
    return await data.$query().delete();

    // return transaction(VariantProductModel, async (_, trx) => {
    //   return VariantProductModel.query()
    //     .deleteById(id)
    //     .returning('*')
    //     .first()
    //     .transacting(trx);
    // });
  }
}
