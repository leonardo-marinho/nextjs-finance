import CategoryController from '@/server/controllers/TransactionCategory.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: CategoryController.findManySubCategories,
  post: CategoryController.createSubCategory,
});

export default handler;
