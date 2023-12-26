import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import Query from '../decorators/Query.decorator';
import UserId from '../decorators/UserId.decorator';
import { IdQuery } from '../dtos/IdQuery.dto';
import { TransactionTransferCreateBody } from '../dtos/TransactionTransferCreateBody.dto';
import { TransactionTransferFindManyBody } from '../dtos/TransactionTransferFindManyBody.dto';
import { TransactionTransferUpdateBody } from '../dtos/TransactionTransferUpdateBody.dto';
import TransactionTransferService from '../services/TransactionTransfer.service';

class TransactionTransferController {
  @Endpoint({ private: true })
  async create(
    @Body({ schema: TransactionTransferCreateBody }) body: TransactionTransferCreateBody,
    @UserId userId: number,
  ) {
    return await TransactionTransferService.create(body, userId);
  }

  @Endpoint({ private: true })
  async findMany(
    @Body({ schema: TransactionTransferFindManyBody }) { filters }: TransactionTransferFindManyBody,
  ) {
    return await TransactionTransferService.findMany(filters);
  }

  @Endpoint({ private: true })
  async remove(@Query({ schema: IdQuery }) { id }: IdQuery) {
    return await TransactionTransferService.remove(id);
  }

  @Endpoint({ private: true })
  async update(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: TransactionTransferUpdateBody }) body: TransactionTransferUpdateBody,
  ) {
    return await TransactionTransferService.update(id, body);
  }
}

export default new TransactionTransferController();
