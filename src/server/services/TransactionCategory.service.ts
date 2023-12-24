import prisma from '@/lib/database';
import { Category, SubCategory } from '@prisma/client';

import { TransactionCategoryCreateBody } from '../dtos/TransactionCategoryCreateBody.dto';
import { TransactionCategoryFindManyFilters } from '../dtos/TransactionCategoryFindManyFilters.dto';
import { TransactionCategoryUpdateBody } from '../dtos/TransactionCategoryUpdateBody.dto';
import { TransactionSubCategoryCreateBody } from '../dtos/TransactionSubCategoryCreateBody.dto';
import { TransactionSubCategoryFindManyFilters } from '../dtos/TransactionSubCategoryFindManyFilters.dto';
import { TransactionSubCategoryUpdateBody } from '../dtos/TransactionSubCategoryUpdateBody.dto';

class TransactionCategoryService {
  async create(data: TransactionCategoryCreateBody, userId: number): Promise<Category> {
    return await prisma.category.create({
      data: {
        name: data.name,
        userId,
      },
    });
  }

  async createSubCategory(
    data: TransactionSubCategoryCreateBody,
    userId: number,
  ): Promise<SubCategory> {
    return await prisma.subCategory.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        userId,
      },
    });
  }

  async findMany(filters?: TransactionCategoryFindManyFilters): Promise<Category[]> {
    return await prisma.category.findMany({
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
  ): Promise<SubCategory[]> {
    return await prisma.subCategory.findMany({
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

  async remove(id: number): Promise<Category> {
    await prisma.subCategory.deleteMany({
      where: {
        categoryId: id,
      },
    });

    return await prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async removeSubCategory(id: number): Promise<SubCategory> {
    return await prisma.subCategory.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: TransactionCategoryUpdateBody): Promise<Category> {
    return await prisma.category.update({
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
  ): Promise<SubCategory> {
    return await prisma.subCategory.update({
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
