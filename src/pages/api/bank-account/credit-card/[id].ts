import CreditCardController from '@/server/controllers/CreditCard.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  delete: CreditCardController.remove,
  patch: CreditCardController.update,
});

export default handler;
