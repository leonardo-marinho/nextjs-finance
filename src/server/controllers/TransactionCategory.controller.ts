import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import Query from '../decorators/Query.decorator';
import UserId from '../decorators/UserId.decorator';
import { IdQuery } from '../dtos/IdQuery.dto';
import { TransactionCategoryCreateBody } from '../dtos/TransactionCategoryCreateBody.dto';
import { TransactionCategoryFindManyBody } from '../dtos/TransactionCategoryFindManyBody.dto';
import { TransactionCategoryUpdateBody } from '../dtos/TransactionCategoryUpdateBody.dto';
import { TransactionSubCategoryCreateBody } from '../dtos/TransactionSubCategoryCreateBody.dto';
import { TransactionSubCategoryFindManyBody } from '../dtos/TransactionSubCategoryFindManyBody.dto';
import TransactionCategory from '../services/TransactionCategory.service';

class TransactionCategoryController {
  @Endpoint({ private: true })
  async create(
    @Body({ schema: TransactionCategoryCreateBody }) body: TransactionCategoryCreateBody,
    @UserId userId: number,
  ) {
    return await TransactionCategory.create(body, userId);
  }

  @Endpoint({ private: true })
  async createSubCategory(
    @Body({ schema: TransactionSubCategoryCreateBody }) body: TransactionSubCategoryCreateBody,
    @UserId userId: number,
  ) {
    return await TransactionCategory.createSubCategory(body, userId);
  }

  @Endpoint({ private: true })
  async findMany(
    @Body({ schema: TransactionCategoryFindManyBody })
    body?: TransactionCategoryFindManyBody,
  ) {
    return await TransactionCategory.findMany(body?.filters);
  }

  @Endpoint({ private: true })
  async findManySubCategories(
    @Body({ schema: TransactionSubCategoryFindManyBody })
    { filters }: TransactionSubCategoryFindManyBody,
  ) {
    return await TransactionCategory.findManySubCategories(filters);
  }

  @Endpoint({ private: true })
  async remove(@Query({ schema: IdQuery }) { id }: IdQuery) {
    return await TransactionCategory.remove(id);
  }

  @Endpoint({ private: true })
  async removeSubCategory(@Query({ schema: IdQuery }) { id }: IdQuery) {
    return await TransactionCategory.removeSubCategory(id);
  }

  @Endpoint({ private: true })
  async update(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: TransactionCategoryUpdateBody }) body: TransactionCategoryUpdateBody,
  ) {
    return await TransactionCategory.update(id, body);
  }

  @Endpoint({ private: true })
  async updateSubCategory(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: TransactionCategoryUpdateBody }) body: TransactionCategoryUpdateBody,
  ) {
    return await TransactionCategory.updateSubCategory(id, body);
  }
}

export default new TransactionCategoryController();
