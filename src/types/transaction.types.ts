export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Transaction {
  id: string;
  budgetId?: string;
  name?: string;
  amount?: number;
  description?: string | null;
  date?: Date;
  category?: string;
  type?: TransactionType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTransactionDto {
  budgetId?: string;
  name?: string;
  amount?: number;
  description?: string;
  date?: Date;
  category?: string;
  type?: TransactionType;
}

export interface UpdateTransactionDto {
  name?: string;
  amount?: number;
  description?: string;
  date?: Date;
  category?: string;
  type?: TransactionType;
}

export interface TransactionFilters {
  type?: TransactionType | 'ALL';
  category?: string;
  startDate?: Date;
  endDate?: Date;
  searchQuery?: string;
}

export interface CategoryData {
  category?: string;
  amount?: number;
  percentage?: number;
  count?: number;
}