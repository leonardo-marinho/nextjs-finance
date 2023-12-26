import { TransactionTransferVariant } from '@prisma/client';
import moment from 'moment';

import { BiCalculateBalanceFilters } from '../dtos/BiCalculateBalanceFilters.dto';
import { BiCalculateBalanceResponse } from '../dtos/BiCalculateBalanceResponse.dto';
import { TransactionExpenseFindManyFilters } from '../dtos/TransactionExpenseFindManyFilters.dto';
import { TransactionRevenueFindManyFilters } from '../dtos/TransactionRevenueFindManyFilters.dto';
import TransactionExpenseService from './TransactionExpense.service';
import TransactionRevenueService from './TransactionRevenue.service';

class BiService {
  async calculateBalance(
    filters: BiCalculateBalanceFilters,
    userId: number,
  ): Promise<BiCalculateBalanceResponse> {
    const findManyFilters: TransactionExpenseFindManyFilters | TransactionRevenueFindManyFilters = {
      bankAccountIds: filters?.bankAccountId ? [filters.bankAccountId] : undefined,
      endCalculationDate: filters.endDate,
      ignoredTransactions: false,
      startCalculationDate: filters?.startDate,
      userIds: [userId],
      variants: [TransactionTransferVariant.Regular],
    };

    const expenses = await TransactionExpenseService.findMany(findManyFilters);
    const expensesSum = expenses.reduce((acc, expense) => {
      let amount = expense.amount;
      if (expense?.installments && expense.installments > 1) {
        const installmentAmount = amount / expense.installments;
        let paidInstallments = moment(filters.endDate).diff(
          moment(expense.calculationDate),
          'months',
        );
        paidInstallments =
          paidInstallments > expense.installments ? expense.installments : paidInstallments;
        amount = installmentAmount * paidInstallments;
      }
      return acc + amount;
    }, 0);

    const revenues = await TransactionRevenueService.findMany(findManyFilters);
    const revenuesSum = revenues.reduce((acc, revenue) => acc + revenue.amount, 0);

    return {
      balance: revenuesSum - expensesSum,
      expenses: expensesSum,
      revenues: revenuesSum,
    };
  }
}

export default new BiService();
