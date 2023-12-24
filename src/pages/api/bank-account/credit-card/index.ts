import CreditCardController from '@/server/controllers/CreditCard.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: CreditCardController.findMany,
  post: CreditCardController.create,
});

export default handler;
