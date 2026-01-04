'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Select } from '@/components';
import { TransactionType, TransactionFilters as IFilters } from '@/types/transaction.types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/lib/constants';
import './TransactionFilters.scss';

interface TransactionFiltersProps {
  filters: IFilters;
  onFilterChange: (key: string, value: string | TransactionType | 'ALL') => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({ filters, onFilterChange }) => {
  const allCategories = Array.from(new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].map(c => c.value)));

  return (
    <>
      <div className="filters-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.searchQuery || ''}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
        />
      </div>

      <div className="filters-row">
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
          options={[{ value: 'all', label: 'All Categories' }, ...allCategories.map(v => ({ value: v, label: v }))]}
          value={filters.category || 'all'}
          onChange={(e) => onFilterChange('category', e.target.value)}
        />
      </div>
    </>
  );
};