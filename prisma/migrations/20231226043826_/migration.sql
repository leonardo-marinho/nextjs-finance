-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('Checking', 'Savings');

-- CreateEnum
CREATE TYPE "TransactionTransferVariant" AS ENUM ('Regular', 'Transfer');

-- CreateEnum
CREATE TYPE "TransactionTransferType" AS ENUM ('In', 'Out');

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER DEFAULT 0,
    "type" "BankAccountType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "limit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionCategory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TransactionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionExpense" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "creditCardId" INTEGER,
    "categoryId" INTEGER NOT NULL,
    "subCategoryId" INTEGER,
    "description" TEXT NOT NULL,
    "observation" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "amount" DOUBLE PRECISION NOT NULL,
    "installments" INTEGER DEFAULT 1,
    "ignoreTransaction" BOOLEAN NOT NULL DEFAULT false,
    "variant" "TransactionTransferVariant" NOT NULL DEFAULT 'Regular',
    "date" TIMESTAMP(3) NOT NULL,
    "calculationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TransactionExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionRevenue" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "subCategoryId" INTEGER,
    "description" TEXT NOT NULL,
    "observation" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "amount" DOUBLE PRECISION NOT NULL,
    "ignoreTransaction" BOOLEAN NOT NULL DEFAULT false,
    "variant" "TransactionTransferVariant" NOT NULL DEFAULT 'Regular',
    "date" TIMESTAMP(3) NOT NULL,
    "calculationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TransactionRevenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionSubCategory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TransactionSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionTransfer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expenseId" INTEGER NOT NULL,
    "revenueId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TransactionTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionTransfer_expenseId_key" ON "TransactionTransfer"("expenseId");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionTransfer_revenueId_key" ON "TransactionTransfer"("revenueId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionCategory" ADD CONSTRAINT "TransactionCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionExpense" ADD CONSTRAINT "TransactionExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionExpense" ADD CONSTRAINT "TransactionExpense_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionExpense" ADD CONSTRAINT "TransactionExpense_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "CreditCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionExpense" ADD CONSTRAINT "TransactionExpense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TransactionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionExpense" ADD CONSTRAINT "TransactionExpense_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "TransactionSubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRevenue" ADD CONSTRAINT "TransactionRevenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRevenue" ADD CONSTRAINT "TransactionRevenue_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRevenue" ADD CONSTRAINT "TransactionRevenue_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TransactionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRevenue" ADD CONSTRAINT "TransactionRevenue_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "TransactionSubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionSubCategory" ADD CONSTRAINT "TransactionSubCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionSubCategory" ADD CONSTRAINT "TransactionSubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TransactionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionTransfer" ADD CONSTRAINT "TransactionTransfer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionTransfer" ADD CONSTRAINT "TransactionTransfer_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "TransactionExpense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionTransfer" ADD CONSTRAINT "TransactionTransfer_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "TransactionRevenue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
