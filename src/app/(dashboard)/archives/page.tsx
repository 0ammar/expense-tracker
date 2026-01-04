'use client';

import React from 'react';
import { useBudgets } from '@/hooks/useBudgets';
import { BudgetCard, LoadingSpinner } from '@/components';
import styles from './page.module.scss';

export default function ArchivesPage() {
  const { budgets, loading } = useBudgets(true);

  if (loading) return <LoadingSpinner text="Loading archives..." />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Archived Budgets</h1>
      </div>

      {budgets.length > 0 ? (
        <div className={styles.grid}>
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No archived budgets</p>
        </div>
      )}
    </div>
  );
}