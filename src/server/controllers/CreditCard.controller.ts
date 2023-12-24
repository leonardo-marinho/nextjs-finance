import { CreditCard } from '@prisma/client';

import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import Query from '../decorators/Query.decorator';
import UserId from '../decorators/UserId.decorator';
import { CreditCardCreateBody } from '../dtos/CreditCardCreateBody.dto';
import { CreditCardFindManyBody } from '../dtos/CreditCardFindManyBody.dto';
import { CreditCardUpdateBody } from '../dtos/CreditCardUpdateBody.dto';
import { IdQuery } from '../dtos/IdQuery.dto';
import CreditCardService from '../services/CreditCard.service';

class CreditCardController {
  @Endpoint({ private: true })
  async create(
    @Body({ schema: CreditCardCreateBody }) body: CreditCardCreateBody,
    @UserId userId: number,
  ): Promise<boolean> {
    console.log(1);
    await CreditCardService.create(body, userId);
    return true;
  }

  @Endpoint({ private: true })
  async findMany(
    @Body({ schema: CreditCardFindManyBody }) body?: CreditCardFindManyBody,
  ): Promise<CreditCard[]> {
    return await CreditCardService.findMany(body?.filters);
  }

  @Endpoint({ private: true })
  async remove(@Query({ schema: IdQuery }) { id }: IdQuery): Promise<boolean> {
    await CreditCardService.remove(id);
    return true;
  }

  @Endpoint({ private: true })
  async update(
    @Query({ schema: IdQuery }) { id }: IdQuery,
    @Body({ schema: CreditCardUpdateBody }) body: CreditCardUpdateBody,
  ): Promise<boolean> {
    await CreditCardService.update(id, body);
    return true;
  }
}

export default new CreditCardController();
