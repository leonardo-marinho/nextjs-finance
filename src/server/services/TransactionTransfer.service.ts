import prisma from '@/lib/database';
import { TransactionPaymentMethodType } from '@/lib/enums/Transaction';
import { ApiBadRequestException } from '@/lib/exceptions/ApiBadRequest.exception';
import { TransactionTransfer, TransactionTransferVariant } from '@prisma/client';

import { TransactionTransferCreateBody } from '../dtos/TransactionTransferCreateBody.dto';
import { TransactionTransferFindManyFilters } from '../dtos/TransactionTransferFindManyFilters.dto';
import { TransactionTransferUpdateBody } from '../dtos/TransactionTransferUpdateBody.dto';
import TransactionExpenseService from './TransactionExpense.service';
import TransactionRevenueService from './TransactionRevenue.service';

class TransactionTransferService {
  async create(data: TransactionTransferCreateBody, userId: number): Promise<TransactionTransfer> {
    const expense = await TransactionExpenseService.create(
      {
        amount: data.amount,
        calculationDate: data.calculationDate,
        categoryId: data.categoryId,
        categoryType: data.categoryType,
        date: data.date,
        description: data.description,
        ignoreTransaction: data?.ignoreTransaction,
        observation: data?.observation,
        paymentMethodId: data.originBankAccountId,
        paymentMethodType: TransactionPaymentMethodType.BANK_ACCOUNT,
        tags: data?.tags,
        variant: TransactionTransferVariant.Transfer,
      },
      userId,
    );

    const revenue = await TransactionRevenueService.create(
      {
        amount: data.amount,
        bankAccountId: data.destinationBankAccountId,
        calculationDate: data.calculationDate,
        categoryId: data.categoryId,
        categoryType: data.categoryType,
        date: data.date,
        description: data.description,
        ignoreTransaction: data?.ignoreTransaction,
        observation: data?.observation,
        tags: data?.tags,
        variant: TransactionTransferVariant.Transfer,
      },
      userId,
    );

    return await prisma.transactionTransfer.create({
      data: {
        expenseId: expense.id,
        revenueId: revenue.id,
        userId,
      },
    });
  }

  async findMany(filters?: TransactionTransferFindManyFilters): Promise<TransactionTransfer[]> {
    return await prisma.transactionTransfer.findMany({
      where: {
        expenseId: filters?.expenseId,
        id: {
          in: filters?.ids,
        },
        revenueId: filters?.revenueId,
        userId: {
          in: filters?.userIds,
        },
      },
    });
  }

  async remove(id: number): Promise<TransactionTransfer> {
    const transfer = await prisma.transactionTransfer.findUnique({
      where: {
        id,
      },
    });

    if (!transfer) throw new ApiBadRequestException('Transfer not found');

    await TransactionExpenseService.remove(transfer.expenseId);
    await TransactionRevenueService.remove(transfer.revenueId);

    return await prisma.transactionTransfer.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: TransactionTransferUpdateBody): Promise<TransactionTransfer> {
    const transfer = await prisma.transactionTransfer.findUnique({
      where: {
        id,
      },
    });

    if (!transfer) throw new ApiBadRequestException('Transfer not found');

    await TransactionExpenseService.update(transfer.expenseId, {
      amount: data?.amount,
      calculationDate: data?.calculationDate,
      categoryId: data?.categoryId,
      categoryType: data?.categoryType,
      date: data?.date,
      description: data?.description,
      ignoreTransaction: data?.ignoreTransaction,
      observation: data?.observation,
      paymentMethodId: data?.originBankAccountId,
      paymentMethodType: TransactionPaymentMethodType.BANK_ACCOUNT,
      tags: data?.tags,
    });

    await TransactionRevenueService.update(transfer.revenueId, {
      amount: data?.amount,
      bankAccountId: data?.destinationBankAccountId,
      calculationDate: data?.calculationDate,
      categoryId: data?.categoryId,
      categoryType: data?.categoryType,
      date: data?.date,
      description: data?.description,
      ignoreTransaction: data?.ignoreTransaction,
      observation: data?.observation,
      tags: data?.tags,
    });

    return transfer;
  }
}

export default new TransactionTransferService();
