import { first } from 'rxjs/operators';
import { CommonModule } from '../common/common.module';
import { Inject, Injectable, Delete } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { query } from '../auth/constants';
import { ColorModel } from 'src/database/models/color.model';

@Injectable()
export class ColorsService {
  constructor(
    // @Inject('ColorModel') private modelClass: ModelClass<ColorModel>,
    private commonModule: CommonModule,
  ) {}

  findAll(page: number, limit: number, search: string) {
    const pageNo = page ? page : query.page;
    const pageLimit = limit ? limit : query.limit;

    search = search ? '%' + search + '%' : '';

    if (search == '') {
      return ColorModel.query()
        .whereNotDeleted()
        .select('id', 'name', 'slug')
        .page(pageNo - 1, pageLimit);
    }

    return ColorModel.query()
      .whereNotDeleted()
      .select('id', 'name', 'slug')
      .page(pageNo - 1, pageLimit)
      .where('name', 'like', search)
      .orWhere('slug', 'like', search);
  }

  list(search: string) {
    search = search ? '%' + search + '%' : '';

    if (search == '') {
      return ColorModel.query()
        .whereNotDeleted()
        .select('id', 'name as label', 'slug');
    }

    return ColorModel.query()
      .whereNotDeleted()
      .select('id', 'name as label', 'slug')
      .where('name', 'like', search)
      .orWhere('slug', 'like', search);
  }

  findOneById(id: number) {
    return ColorModel.query().select('id', 'name', 'slug').findById(id);
  }

  findOne(slug: string) {
    return ColorModel.query().findOne({ slug });
  }

  async create(props: Partial<ColorModel>) {
    props.slug = this.commonModule.makeSlug(props.name);

    try {
      return await ColorModel.query().insert(props).returning('*');
    } catch (err) {
      const color = await ColorModel.query().findOne({ slug: props.slug });
      if (color && color.deleted) {
        console.log(color);
        await color.$query().hardDelete();
        return await this.create(props);
      }
      console.log('err: ');
      console.log(err.data);
    }
  }

  async update(id: number, props: Partial<ColorModel>) {
    props.slug = this.commonModule.makeSlug(props.name);

    try {
      const color = await ColorModel.query().findOne({ id });

      return await color
        .$query()
        .update(props)
        .where({ id })
        .returning('*')
        .first();
    } catch (err) {
      const color = await ColorModel.query().findOne({ slug: props.slug });
      if (color && color.deleted) {
        console.log(color);
        await color.$query().hardDelete();
        return await this.update(id, props);
      }
      console.log('err: ');
      console.log(err.data);
    }
  }

  async delete(id: number) {
    const color = await ColorModel.query().findOne({ id });
    return await color.$query().delete();

    // return transaction(color, async (_, trx) => {
    // .transacting(trx);
    // });
  }
}
