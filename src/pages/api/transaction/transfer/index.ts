import TransactionTransferController from '@/server/controllers/TransactionTransfer.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: TransactionTransferController.findMany,
  post: TransactionTransferController.create,
});

export default handler;
