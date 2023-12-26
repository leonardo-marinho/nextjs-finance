import TransactionExpenseController from '@/server/controllers/TransactionExpense.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: TransactionExpenseController.findMany,
  post: TransactionExpenseController.create,
});

export default handler;
