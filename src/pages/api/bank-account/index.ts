import BankAccountController from '@/server/controllers/BankAccount.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: BankAccountController.findMany,
  post: BankAccountController.create,
});

export default handler;
