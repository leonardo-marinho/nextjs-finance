import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import Query from '../decorators/Query.decorator';
import UserId from '../decorators/UserId.decorator';
import { IdQuery } from '../dtos/IdQuery.dto';
import { TransactionRevenueCreateBody } from '../dtos/TransactionRevenueCreateBody.dto';
import { TransactionRevenueFindManyBody } from '../dtos/TransactionRevenueFindManyBody.dto';
import { TransactionRevenueUpdateBody } from '../dtos/TransactionRevenueUpdateBody.dto';
import TransactionRevenueService from '../services/TransactionRevenue.service';

class TransactionRevenueController {
  @Endpoint({ private: true })
  async create(
    @Body({ schema: TransactionRevenueCreateBody }) body: TransactionRevenueCreateBody,
    @UserId userId: number,
  ) {
    return await TransactionRevenueService.create(body, userId);
  }

  @Endpoint({ private: true })
  async findMany(
    @Body({ schema: TransactionRevenueFindManyBody }) { filters }: TransactionRevenueFindManyBody,
  ) {
    return await TransactionRevenueService.findMany(filters);
  }

  @Endpoint({ private: true })
  async remove(@Query({ schema: IdQuery }) { id }: IdQuery) {
    return await TransactionRevenueService.remove(id);
  }

  @Endpoint({ private: true })
  async update(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: TransactionRevenueUpdateBody }) body: TransactionRevenueUpdateBody,
  ) {
    return await TransactionRevenueService.update(id, body);
  }
}

export default new TransactionRevenueController();
