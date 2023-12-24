import TransactionRevenueController from '@/server/controllers/TransactionRevenue.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: TransactionRevenueController.findMany,
  post: TransactionRevenueController.create,
});

export default handler;
