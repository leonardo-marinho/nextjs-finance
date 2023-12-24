import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import Query from '../decorators/Query.decorator';
import UserId from '../decorators/UserId.decorator';
import { IdQuery } from '../dtos/IdQuery.dto';
import { TransactionExpenseCreateBody } from '../dtos/TransactionExpenseCreateBody.dto';
import { TransactionExpenseFindManyBody } from '../dtos/TransactionExpenseFindManyBody.dto';
import { TransactionExpenseUpdateBody } from '../dtos/TransactionExpenseUpdateBody.dto';
import TransactionExpenseService from '../services/TransactionExpense.service';

class TransactionExpenseController {
  @Endpoint({ private: true })
  async create(
    @Body({ schema: TransactionExpenseCreateBody }) body: TransactionExpenseCreateBody,
    @UserId userId: number,
  ) {
    return await TransactionExpenseService.create(body, userId);
  }

  @Endpoint({ private: true })
  async findMany(
    @Body({ schema: TransactionExpenseFindManyBody }) { filters }: TransactionExpenseFindManyBody,
  ) {
    return await TransactionExpenseService.findMany(filters);
  }

  @Endpoint({ private: true })
  async remove(@Query({ schema: IdQuery }) { id }: IdQuery) {
    return await TransactionExpenseService.remove(id);
  }

  @Endpoint({ private: true })
  async update(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: TransactionExpenseUpdateBody }) body: TransactionExpenseUpdateBody,
  ) {
    return await TransactionExpenseService.update(id, body);
  }
}

export default new TransactionExpenseController();
