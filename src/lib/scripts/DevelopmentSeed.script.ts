import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: [
      {
        email: 'test@email.com',
        password: '$2a$08$zbka4bnkOZpY6kq8GPASwu/sQHctd49Z0Mk2QamaCAJk8W9PdZ/Bm',
      },
    ],
  });

  await prisma.bankAccount.createMany({
    data: [
      {
        name: 'Super Bank',
        type: 'Checking',
        userId: 1,
      },
      {
        name: 'Light Invest',
        type: 'Checking',
        userId: 1,
      },
    ],
  });

  await prisma.creditCard.createMany({
    data: [
      {
        bankAccountId: 1,
        limit: 1000,
        name: 'Super Bank Card',
        userId: 1,
      },
      {
        bankAccountId: 2,
        limit: 2500.5,
        name: 'Light Invest Card',
        userId: 1,
      },
    ],
  });

  await prisma.transactionCategory.createMany({
    data: [
      {
        name: 'Food',
        userId: 1,
      },
      {
        name: 'Transport',
        userId: 1,
      },
      {
        name: 'Health',
        userId: 1,
      },
      {
        name: 'Education',
        userId: 1,
      },
      {
        name: 'Entertainment',
        userId: 1,
      },
      {
        name: 'Investment',
        userId: 1,
      },
    ],
  });

  await prisma.transactionSubCategory.createMany({
    data: [
      {
        categoryId: 1,
        name: 'Groceries',
        userId: 1,
      },
      {
        categoryId: 1,
        name: 'Fast Food',
        userId: 1,
      },
      {
        categoryId: 2,
        name: 'Public Transport',
        userId: 1,
      },
      {
        categoryId: 3,
        name: 'Health Insurance',
        userId: 1,
      },
      {
        categoryId: 3,
        name: 'Doctor',
        userId: 1,
      },
      {
        categoryId: 4,
        name: 'University',
        userId: 1,
      },
      {
        categoryId: 4,
        name: 'School',
        userId: 1,
      },
      {
        categoryId: 5,
        name: 'Netflix',
        userId: 1,
      },
      {
        categoryId: 5,
        name: 'Spotify',
        userId: 1,
      },
      {
        categoryId: 6,
        name: 'Stocks',
        userId: 1,
      },
      {
        categoryId: 6,
        name: 'Bonds',
        userId: 1,
      },
    ],
  });
};

main();
