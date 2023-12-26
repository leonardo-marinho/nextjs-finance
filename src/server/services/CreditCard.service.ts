import prisma from '@/lib/database';
import { ApiBadRequestException } from '@/lib/exceptions/ApiBadRequest.exception';
import { CreditCard } from '@prisma/client';

import { CreditCardCreateBody } from '../dtos/CreditCardCreateBody.dto';
import { CreditCardFindManyFilters } from '../dtos/CreditCardFindManyFilters.dto';
import { CreditCardUpdateBody } from '../dtos/CreditCardUpdateBody.dto';

class CreditCardService {
  async create(data: CreditCardCreateBody, userId: number): Promise<CreditCard> {
    return await prisma.creditCard.create({
      data: {
        bankAccountId: data.bankAccountId,
        limit: data.limit,
        name: data.name,
        userId,
      },
    });
  }

  async findMany(filters?: CreditCardFindManyFilters): Promise<CreditCard[]> {
    return await prisma.creditCard.findMany({
      where: {
        bankAccountId: {
          in: filters?.bankAccountIds,
        },
        name: {
          in: filters?.names,
        },
        userId: {
          in: filters?.userIds,
        },
      },
    });
  }

  async remove(id: number): Promise<CreditCard> {
    if (await prisma.transactionExpense.count({ where: { creditCardId: id } }))
      throw new ApiBadRequestException('Cannot delete credit card with transactions');

    return await prisma.creditCard.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: CreditCardUpdateBody): Promise<CreditCard> {
    return await prisma.creditCard.update({
      data,
      where: {
        id,
      },
    });
  }
}

export default new CreditCardService();
