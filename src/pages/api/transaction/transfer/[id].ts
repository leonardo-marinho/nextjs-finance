import TransactionTransferController from '@/server/controllers/TransactionTransfer.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  delete: TransactionTransferController.remove,
  patch: TransactionTransferController.update,
});

export default handler;
