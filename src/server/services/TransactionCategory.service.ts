import prisma from '@/lib/database';
import { ApiBadRequestException } from '@/lib/exceptions/ApiBadRequest.exception';
import { TransactionCategory, TransactionSubCategory } from '@prisma/client';

import { TransactionCategoryCreateBody } from '../dtos/TransactionCategoryCreateBody.dto';
import { TransactionCategoryFindManyFilters } from '../dtos/TransactionCategoryFindManyFilters.dto';
import { TransactionCategoryUpdateBody } from '../dtos/TransactionCategoryUpdateBody.dto';
import { TransactionSubCategoryCreateBody } from '../dtos/TransactionSubCategoryCreateBody.dto';
import { TransactionSubCategoryFindManyFilters } from '../dtos/TransactionSubCategoryFindManyFilters.dto';
import { TransactionSubCategoryUpdateBody } from '../dtos/TransactionSubCategoryUpdateBody.dto';

class TransactionCategoryService {
  async create(data: TransactionCategoryCreateBody, userId: number): Promise<TransactionCategory> {
    return await prisma.transactionCategory.create({
      data: {
        name: data.name,
        userId,
      },
    });
  }

  async createSubCategory(
    data: TransactionSubCategoryCreateBody,
    userId: number,
  ): Promise<TransactionSubCategory> {
    return await prisma.transactionSubCategory.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        userId,
      },
    });
  }

  async findMany(filters?: TransactionCategoryFindManyFilters): Promise<TransactionCategory[]> {
    return await prisma.transactionCategory.findMany({
      include: {
        SubCategories: true,
      },
      where: {
        id: {
          in: filters?.ids,
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

  async findManySubCategories(
    filters?: TransactionSubCategoryFindManyFilters,
  ): Promise<TransactionSubCategory[]> {
    return await prisma.transactionSubCategory.findMany({
      where: {
        categoryId: {
          in: filters?.categoryIds,
        },
        id: {
          in: filters?.ids,
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

  async remove(id: number): Promise<TransactionCategory> {
    const expenses = await prisma.transactionExpense.findMany({
      where: {
        categoryId: id,
      },
    });
    if (expenses.length) throw new ApiBadRequestException('Category has expenses');

    await prisma.transactionSubCategory.deleteMany({
      where: {
        categoryId: id,
      },
    });

    return await prisma.transactionCategory.delete({
      where: {
        id,
      },
    });
  }

  async removeSubCategory(id: number): Promise<TransactionSubCategory> {
    const expenses = await prisma.transactionExpense.findMany({
      where: {
        subCategoryId: id,
      },
    });
    if (expenses.length) throw new ApiBadRequestException('Category has expenses');

    return await prisma.transactionSubCategory.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: TransactionCategoryUpdateBody): Promise<TransactionCategory> {
    return await prisma.transactionCategory.update({
      data: {
        name: data?.name,
      },
      where: {
        id,
      },
    });
  }

  async updateSubCategory(
    id: number,
    data: TransactionSubCategoryUpdateBody,
  ): Promise<TransactionSubCategory> {
    return await prisma.transactionSubCategory.update({
      data: {
        name: data?.name,
      },
      where: {
        id,
      },
    });
  }
}

export default new TransactionCategoryService();
