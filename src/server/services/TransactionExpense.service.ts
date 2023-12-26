import prisma from '@/lib/database';
import { TransactionCategoryType, TransactionPaymentMethodType } from '@/lib/enums/Transaction';
import { ApiBadRequestException } from '@/lib/exceptions/ApiBadRequest.exception';
import { Prisma, TransactionExpense, TransactionTransferVariant } from '@prisma/client';

import { TransactionExpenseCreateBody } from '../dtos/TransactionExpenseCreateBody.dto';
import { TransactionExpenseFindManyFilters } from '../dtos/TransactionExpenseFindManyFilters.dto';
import { TransactionExpenseUpdateBody } from '../dtos/TransactionExpenseUpdateBody.dto';

class TransactionExpenseService {
  async create(data: TransactionExpenseCreateBody, userId: number): Promise<TransactionExpense> {
    const createData: Prisma.TransactionExpenseUncheckedCreateInput = {
      amount: data.amount,
      bankAccountId: 0,
      calculationDate: data.calculationDate || data.date,
      categoryId: 0,
      creditCardId: null,
      date: data.date,
      description: data.description,
      ignoreTransaction: data.ignoreTransaction || false,
      installments: data.installments || 1,
      observation: data?.observation,
      subCategoryId: null,
      tags: data?.tags,
      userId,
      variant: data?.variant,
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
    } else throw new ApiBadRequestException('Invalid category type');

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
        ...(filters?.tags?.length
          ? {
              tags: {
                hasSome: filters?.tags,
              },
            }
          : {}),
        userId: {
          in: filters?.userIds,
        },
        variant: {
          in: filters?.variants,
        },
      },
    });
  }

  async remove(id: number): Promise<TransactionExpense> {
    const transaction = await prisma.transactionExpense.findUnique({
      where: {
        id,
      },
    });

    if (transaction?.variant === TransactionTransferVariant.Transfer)
      throw new ApiBadRequestException(
        'Transaction cannot be removed because it is linked to a transfer',
      );

    return await prisma.transactionExpense.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: TransactionExpenseUpdateBody): Promise<TransactionExpense> {
    const updateData: Prisma.TransactionExpenseUncheckedUpdateInput = {
      amount: data?.amount,
      calculationDate: data?.calculationDate,
      date: data?.date,
      description: data?.description,
      ignoreTransaction: data?.ignoreTransaction,
      installments: data?.installments,
      observation: data?.observation,
      tags: data?.tags,
      variant: data?.variant,
    };

    if (
      (data?.paymentMethodType && !data?.paymentMethodId) ||
      (!data?.paymentMethodType && data?.paymentMethodId)
    )
      throw new ApiBadRequestException('Passing paymentMethodType and paymentMethodId is required');
    if (data?.paymentMethodType === TransactionPaymentMethodType.BANK_ACCOUNT) {
      updateData.bankAccountId = data.paymentMethodId;
    } else if (data?.paymentMethodType === TransactionPaymentMethodType.CREDIT_CARD) {
      const creditCart = await prisma.creditCard.findUnique({
        where: {
          id: data.paymentMethodId,
        },
      });
      if (!creditCart) throw new ApiBadRequestException('Credit card not found');
      updateData.creditCardId = data.paymentMethodId;
      updateData.bankAccountId = creditCart?.bankAccountId;
    }

    if ((data?.categoryType && !data?.categoryId) || (!data?.categoryType && data?.categoryId))
      throw new ApiBadRequestException('Passing categoryType and categoryId is required');
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
