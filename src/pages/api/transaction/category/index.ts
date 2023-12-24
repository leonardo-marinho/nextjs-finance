import TransactionCategoryController from '@/server/controllers/TransactionCategory.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: TransactionCategoryController.findMany,
  post: TransactionCategoryController.create,
});

export default handler;
