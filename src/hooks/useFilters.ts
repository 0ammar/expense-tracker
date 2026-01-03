import { useState, useMemo } from 'react';
import { Transaction, TransactionFilters } from '@/types/transaction.types';

export const useFilters = (transactions: Transaction[]) => {
  const [filters, setFilters] = useState<TransactionFilters>({
    type: 'ALL',
    category: 'all',
    searchQuery: '',
  });

  const filteredTransactions = useMemo(() => {
    console.log('[useFilters] Applying filters:', filters);
    
    let filtered = [...transactions];

    if (filters.type && filters.type !== 'ALL') {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter((t) => new Date(t.date) >= filters.startDate!);
    }

    if (filters.endDate) {
      filtered = filtered.filter((t) => new Date(t.date) <= filters.endDate!);
    }

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log('[useFilters] Filtered transactions:', filtered.length);
    return filtered;
  }, [transactions, filters]);

  const updateFilter = (key: string, value: string | Date | undefined) => {
    console.log('[useFilters] Updating filter:', key, value);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    console.log('[useFilters] Resetting filters');
    setFilters({
      type: 'ALL',
      category: 'all',
      searchQuery: '',
    });
  };

  return {
    filters,
    filteredTransactions,
    updateFilter,
    resetFilters,
  };
};