import prisma from '@/lib/database';
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

  async remove(id: number): Promise<boolean> {
    await prisma.bankAccount.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async update(id: number, data: BankAccountUpdateBody): Promise<BankAccount> {
    return await prisma.bankAccount.update({
      data: {
        name: data?.name,
        type: data?.type,
      },
      where: {
        id,
      },
    });
  }
}

export default new BankAccountService();
