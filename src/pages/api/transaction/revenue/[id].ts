import TransactionRevenueController from '@/server/controllers/TransactionRevenue.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  delete: TransactionRevenueController.remove,
  patch: TransactionRevenueController.update,
});

export default handler;
