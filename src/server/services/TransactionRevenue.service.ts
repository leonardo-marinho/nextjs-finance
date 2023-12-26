import prisma from '@/lib/database';
import { TransactionCategoryType } from '@/lib/enums/Transaction';
import { ApiBadRequestException } from '@/lib/exceptions/ApiBadRequest.exception';
import { Prisma, TransactionRevenue } from '@prisma/client';

import { TransactionRevenueCreateBody } from '../dtos/TransactionRevenueCreateBody.dto';
import { TransactionRevenueFindManyFilters } from '../dtos/TransactionRevenueFindManyFilters.dto';
import { TransactionRevenueUpdateBody } from '../dtos/TransactionRevenueUpdateBody.dto';

class TransactionRevenueService {
  async create(data: TransactionRevenueCreateBody, userId: number): Promise<TransactionRevenue> {
    const createData: Prisma.TransactionRevenueUncheckedCreateInput = {
      amount: data.amount,
      bankAccountId: data.bankAccountId,
      calculationDate: data.calculationDate || data.date,
      categoryId: 0,
      date: data.date,
      description: data.description,
      ignoreTransaction: data.ignoreTransaction || false,
      subCategoryId: null,
      userId,
    };

    if (data.categoryType === TransactionCategoryType.MAIN_CATEGORY) {
      createData.categoryId = data.categoryId;
    } else if (data.categoryType === TransactionCategoryType.SUB_CATEGORY) {
      const subCategory = await prisma.transactionSubCategory.findUnique({
        where: {
          id: data.categoryId,
        },
      });
      if (!subCategory) throw new ApiBadRequestException('Sub category not found');
      createData.categoryId = subCategory?.categoryId;
      createData.subCategoryId = data.categoryId;
    } else throw new ApiBadRequestException('Invalid category type');

    const transaction = await prisma.transactionRevenue.create({
      data: createData,
    });

    return transaction;
  }

  async findMany(filters?: TransactionRevenueFindManyFilters): Promise<TransactionRevenue[]> {
    const whereDateArgs: Prisma.DateTimeFilter<'TransactionRevenue'> = {};

    if ((filters?.startDate || filters?.endDate) && filters?.dates)
      throw new ApiBadRequestException('Passing dates and startDate/endDate is not allowed');
    if (filters?.dates) {
      whereDateArgs.in = filters?.dates;
    } else if (filters?.startDate && filters?.endDate) {
      whereDateArgs.gte = filters?.startDate;
      whereDateArgs.lte = filters?.endDate;
    } else if (filters?.startDate) {
      whereDateArgs.gte = filters?.startDate;
    } else if (filters?.endDate) {
      whereDateArgs.lte = filters?.endDate;
    }

    if ((filters?.startCalculationDate || filters?.endCalculationDate) && filters?.calculationDates)
      throw new ApiBadRequestException(
        'Passing calculation dates and startDate/endDate is not allowed',
      );
    if (filters?.calculationDates) {
      whereDateArgs.in = filters?.calculationDates;
    } else if (filters?.startCalculationDate && filters?.endCalculationDate) {
      whereDateArgs.gte = filters?.startCalculationDate;
      whereDateArgs.lte = filters?.endCalculationDate;
    } else if (filters?.startCalculationDate) {
      whereDateArgs.gte = filters?.startCalculationDate;
    } else if (filters?.endCalculationDate) {
      whereDateArgs.lte = filters?.endCalculationDate;
    }

    return await prisma.transactionRevenue.findMany({
      where: {
        bankAccountId: {
          in: filters?.bankAccountIds,
        },
        categoryId: {
          in: filters?.categoryIds,
        },
        date: whereDateArgs,
        id: {
          in: filters?.ids,
        },
        subCategoryId: {
          in: filters?.subCategoryIds,
        },
        userId: {
          in: filters?.userIds,
        },
      },
    });
  }

  async remove(id: number): Promise<TransactionRevenue> {
    return await prisma.transactionRevenue.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: TransactionRevenueUpdateBody): Promise<TransactionRevenue> {
    const updateData: Prisma.TransactionRevenueUncheckedUpdateInput = {
      amount: data?.amount,
      bankAccountId: data?.bankAccountId,
      calculationDate: data?.calculationDate,
      date: data?.date,
      description: data?.description,
      ignoreTransaction: data?.ignoreTransaction,
    };

    if (data?.categoryType === TransactionCategoryType.MAIN_CATEGORY) {
      updateData.categoryId = data.categoryId;
    } else if (data?.categoryType === TransactionCategoryType.SUB_CATEGORY) {
      const subCategory = await prisma.transactionSubCategory.findUnique({
        where: {
          id: data.categoryId,
        },
      });
      if (!subCategory) throw new ApiBadRequestException('Sub category not found');
      updateData.categoryId = subCategory.categoryId;
      updateData.subCategoryId = data.categoryId;
    } else throw new ApiBadRequestException('Invalid category type');

    return await prisma.transactionRevenue.update({
      data: updateData,
      where: {
        id,
      },
    });
  }
}

export default new TransactionRevenueService();
