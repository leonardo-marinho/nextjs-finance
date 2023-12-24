import TransactionCategoryController from '@/server/controllers/TransactionCategory.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  delete: TransactionCategoryController.remove,
  patch: TransactionCategoryController.update,
});

export default handler;
