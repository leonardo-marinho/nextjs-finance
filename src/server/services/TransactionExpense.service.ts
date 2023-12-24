import prisma from '@/lib/database';
import { TransactionCategoryType, TransactionPaymentMethodType } from '@/lib/enums/Transaction';
import { ApiBadRequestException } from '@/lib/exceptions/ApiBadRequest.exception';
import { Prisma, TransactionExpense } from '@prisma/client';

import { TransactionExpenseCreateBody } from '../dtos/TransactionExpenseCreateBody.dto';
import { TransactionExpenseFindManyFilters } from '../dtos/TransactionExpenseFindManyFilters.dto';
import { TransactionExpenseUpdateBody } from '../dtos/TransactionExpenseUpdateBody.dto';

class TransactionExpenseService {
  async create(data: TransactionExpenseCreateBody, userId: number): Promise<TransactionExpense> {
    const createData: Prisma.TransactionExpenseUncheckedCreateInput = {
      amount: data.amount,
      bankAccountId: 0,
      categoryId: 0,
      creditCardId: null,
      date: data.date,
      description: data.description,
      subCategoryId: null,
      userId,
    };

    if (data.paymentMethodType === TransactionPaymentMethodType.BANK_ACCOUNT) {
      createData.bankAccountId = data.paymentMethodId;
    } else if (data.paymentMethodType === TransactionPaymentMethodType.CREDIT_CARD) {
      const creditCart = await prisma.creditCard.findUnique({
        where: {
          id: data.paymentMethodId,
        },
      });
      if (!creditCart) throw new ApiBadRequestException('Credit card not found');
      createData.creditCardId = data.paymentMethodId;
      createData.bankAccountId = creditCart?.bankAccountId;
    }

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
    }

    const transaction = await prisma.transactionExpense.create({
      data: createData,
    });

    return transaction;
  }

  async findMany(filters?: TransactionExpenseFindManyFilters): Promise<TransactionExpense[]> {
    const whereDateArgs: Prisma.DateTimeFilter<'TransactionExpense'> = {};

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

    return await prisma.transactionExpense.findMany({
      where: {
        bankAccountId: {
          in: filters?.bankAccountIds,
        },
        categoryId: {
          in: filters?.categoryIds,
        },
        creditCardId: {
          in: filters?.creditCardIds,
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

  async remove(id: number): Promise<TransactionExpense> {
    return await prisma.transactionExpense.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: TransactionExpenseUpdateBody): Promise<TransactionExpense> {
    const updateData: Prisma.TransactionExpenseUncheckedUpdateInput = {};

    if (data.paymentMethodType === TransactionPaymentMethodType.BANK_ACCOUNT) {
      updateData.bankAccountId = data.paymentMethodId;
    } else if (data.paymentMethodType === TransactionPaymentMethodType.CREDIT_CARD) {
      const creditCart = await prisma.creditCard.findUnique({
        where: {
          id: data.paymentMethodId,
        },
      });
      if (!creditCart) throw new ApiBadRequestException('Credit card not found');
      updateData.creditCardId = data.paymentMethodId;
      updateData.bankAccountId = creditCart?.bankAccountId;
    }

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
    }

    return await prisma.transactionExpense.update({
      data: updateData,
      where: {
        id,
      },
    });
  }
}

export default new TransactionExpenseService();
