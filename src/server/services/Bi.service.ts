import { TransactionTransferVariant } from '@prisma/client';
import moment from 'moment';

import { BiCalculateBalanceFilters } from '../dtos/BiCalculateBalanceFilters.dto';
import { BiCalculateBalanceResponse } from '../dtos/BiCalculateBalanceResponse.dto';
import { BiCalculateExpensesFilters } from '../dtos/BiCalculateExpensesFilters.dto';
import { BiCalculateExpensesResponse } from '../dtos/BiCalculateExpensesResponse.dto';
import TransactionExpenseService from './TransactionExpense.service';
import TransactionRevenueService from './TransactionRevenue.service';

class BiService {
  async calculateBalance(
    filters: BiCalculateBalanceFilters,
    userId: number,
  ): Promise<BiCalculateBalanceResponse> {
    const revenues = await TransactionRevenueService.findMany({
      bankAccountIds: filters?.bankAccountId ? [filters.bankAccountId] : undefined,
      endCalculationDate: filters.endDate,
      ignoredTransactions: false,
      startCalculationDate: filters?.startDate,
      userIds: [userId],
      variants: [TransactionTransferVariant.Regular],
    });
    const revenuesSum = revenues.reduce((acc, revenue) => acc + revenue.amount, 0);

    const expensesSum = (await this.getExpenses(filters, userId)).expenses;

    return {
      balance: revenuesSum - expensesSum,
      expenses: expensesSum,
      revenues: revenuesSum,
    };
  }

  async getExpenses(
    filters: BiCalculateExpensesFilters,
    userId: number,
  ): Promise<BiCalculateExpensesResponse> {
    const expenses = await TransactionExpenseService.findMany({
      bankAccountIds: filters?.bankAccountId ? [filters.bankAccountId] : undefined,
      creditCardIds: filters?.creditCardId ? filters.creditCardId : undefined,
      endCalculationDate: filters.endDate,
      ignoredTransactions: false,
      startCalculationDate: filters?.startDate,
      userIds: [userId],
      variants: [TransactionTransferVariant.Regular],
    });

    return {
      expenses: expenses.reduce((acc, expense) => {
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
      }, 0),
    };
  }
}

export default new BiService();
