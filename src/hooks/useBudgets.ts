import { useState, useEffect, useCallback } from 'react';
import { Budget, BudgetWithStats, CreateBudgetDto } from '@/types/budget.types';

export const useBudgets = (isArchived: boolean = false) => {
  const [budgets, setBudgets] = useState<BudgetWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgets = useCallback(async () => {
    try {
      console.log('[useBudgets] Fetching budgets, archived:', isArchived);
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/budgets?archived=${isArchived}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch budgets');
      }

      const data = await response.json();
      console.log('[useBudgets] Fetched budgets:', data.budgets?.length || 0);
      setBudgets(data.budgets || []);
    } catch (err) {
      console.error('[useBudgets] Error fetching budgets:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [isArchived]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const createBudget = async (data: CreateBudgetDto): Promise<Budget | null> => {
    try {
      console.log('[useBudgets] Creating budget:', data);
      
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create budget');
      }

      const result = await response.json();
      console.log('[useBudgets] Budget created:', result.budget);
      
      await fetchBudgets();
      return result.budget;
    } catch (err) {
      console.error('[useBudgets] Error creating budget:', err);
      throw err;
    }
  };

  const deleteBudget = async (budgetId: string): Promise<void> => {
    try {
      console.log('[useBudgets] Deleting budget:', budgetId);
      
      const response = await fetch(`/api/budgets/${budgetId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete budget');
      }

      console.log('[useBudgets] Budget deleted');
      await fetchBudgets();
    } catch (err) {
      console.error('[useBudgets] Error deleting budget:', err);
      throw err;
    }
  };

  const archiveBudget = async (budgetId: string, archive: boolean): Promise<void> => {
    try {
      console.log('[useBudgets] Archiving budget:', budgetId, archive);
      
      const response = await fetch(`/api/budgets/${budgetId}/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: archive }),
      });

      if (!response.ok) {
        throw new Error('Failed to archive budget');
      }

      console.log('[useBudgets] Budget archived');
      await fetchBudgets();
    } catch (err) {
      console.error('[useBudgets] Error archiving budget:', err);
      throw err;
    }
  };

  return {
    budgets,
    loading,
    error,
    refetch: fetchBudgets,
    createBudget,
    deleteBudget,
    archiveBudget,
  };
};