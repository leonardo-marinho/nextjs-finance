import prisma from '@/lib/database';
import { ApiBadRequestException } from '@/lib/exceptions/ApiBadRequest.exception';
import { BankAccount } from '@prisma/client';

import { BankAccountCreateBody } from '../dtos/BankAccountCreateBody.dto';
import { BankAccountFindManyFilters } from '../dtos/BankAccountFindManyFilters.dto';
import { BankAccountUpdateBody } from '../dtos/BankAccountUpdateBody.dto';

class BankAccountService {
  async create(data: BankAccountCreateBody, userId: number): Promise<BankAccount> {
    return await prisma.bankAccount.create({
      data: {
        name: data.name,
        type: data.type,
        userId,
      },
    });
  }

  async findMany(filters?: BankAccountFindManyFilters): Promise<BankAccount[]> {
    return await prisma.bankAccount.findMany({
      where: {
        id: {
          in: filters?.ids,
        },
        name: {
          in: filters?.names,
        },
        type: {
          in: filters?.types,
        },
        userId: {
          in: filters?.userIds,
        },
      },
    });
  }

  async remove(id: number): Promise<BankAccount> {
    if (await prisma.transactionExpense.count({ where: { bankAccountId: id } }))
      throw new ApiBadRequestException('Cannot delete credit card with transactions');

    return await prisma.bankAccount.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: BankAccountUpdateBody): Promise<BankAccount> {
    return await prisma.bankAccount.update({
      data,
      where: {
        id,
      },
    });
  }
}

export default new BankAccountService();
