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
import CategoryService from '../services/TransactionCategory.service';

class TransactionCategoryController {
  @Endpoint({ private: true })
  async create(
    @Body({ schema: TransactionCategoryCreateBody }) body: TransactionCategoryCreateBody,
    @UserId userId: number,
  ) {
    return await CategoryService.create(body, userId);
  }

  @Endpoint({ private: true })
  async createSubCategory(
    @Body({ schema: TransactionSubCategoryCreateBody }) body: TransactionSubCategoryCreateBody,
    @UserId userId: number,
  ) {
    return await CategoryService.createSubCategory(body, userId);
  }

  @Endpoint({ private: true })
  async findMany(
    @Body({ schema: TransactionCategoryFindManyBody }) { filters }: TransactionCategoryFindManyBody,
  ) {
    return await CategoryService.findMany(filters);
  }

  @Endpoint({ private: true })
  async findManySubCategories(
    @Body({ schema: TransactionSubCategoryFindManyBody })
    { filters }: TransactionSubCategoryFindManyBody,
  ) {
    return await CategoryService.findManySubCategories(filters);
  }

  @Endpoint({ private: true })
  async remove(@Query({ schema: IdQuery }) { id }: IdQuery) {
    return await CategoryService.remove(id);
  }

  @Endpoint({ private: true })
  async removeSubCategory(@Query({ schema: IdQuery }) { id }: IdQuery) {
    return await CategoryService.removeSubCategory(id);
  }

  @Endpoint({ private: true })
  async update(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: TransactionCategoryUpdateBody }) body: TransactionCategoryUpdateBody,
  ) {
    return await CategoryService.update(id, body);
  }

  @Endpoint({ private: true })
  async updateSubCategory(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: TransactionCategoryUpdateBody }) body: TransactionCategoryUpdateBody,
  ) {
    return await CategoryService.updateSubCategory(id, body);
  }
}

export default new TransactionCategoryController();
