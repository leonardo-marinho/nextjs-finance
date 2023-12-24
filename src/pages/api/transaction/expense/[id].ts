import TransactionExpenseController from '@/server/controllers/TransactionCategory.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  delete: TransactionExpenseController.remove,
  patch: TransactionExpenseController.update,
});

export default handler;
