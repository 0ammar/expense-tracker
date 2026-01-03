import { Transaction } from '@/types/transaction.types';

export const sortTransactionsByDate = (transactions: Transaction[]): Transaction[] => {
  console.log('[TransactionList.logic] Sorting transactions by date');
  
  return [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};