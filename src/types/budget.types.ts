import { Transaction } from "./transaction.types";

export interface Budget {
  id: string;
  userId: string;
  name: string;
  year: number;
  month: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  transactions?: Transaction[];
}

export interface BudgetWithStats extends Budget {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  transactionCount: number;
}

export interface CreateBudgetDto {
  name: string;
  year: number;
  month: number;
}

export interface UpdateBudgetDto {
  name?: string;
  isArchived?: boolean;
}
