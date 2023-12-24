import { BankAccount } from '@prisma/client';

import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import Query from '../decorators/Query.decorator';
import UserId from '../decorators/UserId.decorator';
import { BankAccountCreateBody } from '../dtos/BankAccountCreateBody.dto';
import { BankAccountFindManyBody } from '../dtos/BankAccountFindManyBody.dto';
import { BankAccountUpdateBody } from '../dtos/BankAccountUpdateBody.dto';
import { IdQuery } from '../dtos/IdQuery.dto';
import BankAccountService from '../services/BankAccount.service';

class BankAccountController {
  @Endpoint({ private: true })
  async create(
    @Body({ schema: BankAccountCreateBody }) body: BankAccountCreateBody,
    @UserId userId: number,
  ): Promise<boolean> {
    await BankAccountService.create(body, userId);
    return true;
  }

  @Endpoint({ private: true })
  async findMany(
    @Body({ schema: BankAccountFindManyBody }) body?: BankAccountFindManyBody,
  ): Promise<BankAccount[]> {
    return await BankAccountService.findMany(body?.filters);
  }

  @Endpoint({ private: true })
  async remove(@Query({ schema: IdQuery }) { id }: IdQuery): Promise<boolean> {
    await BankAccountService.remove(id);
    return true;
  }

  @Endpoint({ private: true })
  async update(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: BankAccountUpdateBody }) body: BankAccountUpdateBody,
  ): Promise<boolean> {
    await BankAccountService.update(id, body);
    return true;
  }
}

export default new BankAccountController();
