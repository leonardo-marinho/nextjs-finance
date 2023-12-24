import CategoryController from '@/server/controllers/TransactionCategory.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  delete: CategoryController.removeSubCategory,
  patch: CategoryController.updateSubCategory,
});

export default handler;
