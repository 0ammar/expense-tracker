'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Select } from '@/components/shared/Select/Select';
import { Button } from '@/components/shared/Button/Button';
import { TransactionType, TransactionFilters as ITransactionFilters } from '@/types/transaction.types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/lib/constants';
import { FILTER_LABELS } from './TransactionFilters.constants';
import './TransactionFilters.scss';

interface TransactionFiltersProps {
  filters: ITransactionFilters;
  onFilterChange: (key: string, value: string | TransactionType | 'ALL') => void;
  onReset: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const allCategories = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
  const uniqueCategories = Array.from(new Set(allCategories.map((c) => c.value))).map((value) =>
    allCategories.find((c) => c.value === value)!
  );

  return (
    <div className="transaction-filters">
      <div className="transaction-filters__search">
        <Search className="transaction-filters__search-icon" size={20} />
        <input
          type="text"
          placeholder={FILTER_LABELS.SEARCH_PLACEHOLDER}
          value={filters.searchQuery || ''}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          className="transaction-filters__search-input"
        />
      </div>

      <Select
        name="type"
        options={[
          { value: 'ALL', label: 'All Types' },
          { value: TransactionType.INCOME, label: 'Income' },
          { value: TransactionType.EXPENSE, label: 'Expense' },
        ]}
        value={filters.type || 'ALL'}
        onChange={(e) => onFilterChange('type', e.target.value)}
      />

      <Select
        name="category"
        options={[
          { value: 'all', label: 'All Categories' },
          ...uniqueCategories.map((cat) => ({ value: cat.value, label: cat.label })),
        ]}
        value={filters.category || 'all'}
        onChange={(e) => onFilterChange('category', e.target.value)}
      />

      <Button type="button" variant="ghost" icon={<X size={16} />} onClick={onReset} title="Reset filters">
        {FILTER_LABELS.RESET}
      </Button>
    </div>
  );
};