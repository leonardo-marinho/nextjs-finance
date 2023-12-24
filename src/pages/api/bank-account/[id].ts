import BankAccountController from '@/server/controllers/BankAccount.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  delete: BankAccountController.remove,
  patch: BankAccountController.update,
});

export default handler;
