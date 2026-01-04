import { useState, useEffect, useCallback } from 'react';
import { Transaction, CreateTransactionDto, UpdateTransactionDto } from '@/types/transaction.types';

export const useTransactions = (budgetId: string | null) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!budgetId) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    try {
      console.log('[useTransactions] Fetching transactions for budget:', budgetId);
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/transactions?budgetId=${budgetId}`); // Fixed: removed backslash
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      console.log('[useTransactions] Fetched transactions:', data.transactions?.length || 0);
      setTransactions(data.transactions || []);
    } catch (err) {
      console.error('[useTransactions] Error fetching transactions:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [budgetId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = async (data: CreateTransactionDto): Promise<Transaction | null> => {
    try {
      console.log('[useTransactions] Creating transaction:', data);
      
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create transaction');
      }

      const result = await response.json();
      console.log('[useTransactions] Transaction created:', result.transaction);
      
      await fetchTransactions();
      return result.transaction;
    } catch (err) {
      console.error('[useTransactions] Error creating transaction:', err);
      throw err;
    }
  };

  const updateTransaction = async (
    transactionId: string,
    data: UpdateTransactionDto
  ): Promise<Transaction | null> => {
    try {
      console.log('[useTransactions] Updating transaction:', transactionId, data);
      
      const response = await fetch(`/api/transactions/${transactionId}`, { // Fixed: removed backslash
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction');
      }

      const result = await response.json();
      console.log('[useTransactions] Transaction updated:', result.transaction);
      
      await fetchTransactions();
      return result.transaction;
    } catch (err) {
      console.error('[useTransactions] Error updating transaction:', err);
      throw err;
    }
  };

  const deleteTransaction = async (transactionId: string): Promise<void> => {
    try {
      console.log('[useTransactions] Deleting transaction:', transactionId);
      
      const response = await fetch(`/api/transactions/${transactionId}`, { // Fixed: removed backslash
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      console.log('[useTransactions] Transaction deleted');
      await fetchTransactions();
    } catch (err) {
      console.error('[useTransactions] Error deleting transaction:', err);
      throw err;
    }
  };

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};