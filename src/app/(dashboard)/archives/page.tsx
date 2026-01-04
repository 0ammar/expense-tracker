'use client';

import { useState, useEffect } from 'react';
import { useBudgets } from '@/hooks/useBudgets';
import { BudgetCard, LoadingSpinner } from '@/components';
import styles from './page.module.scss';

export default function ArchivesPage() {
  const { budgets: fetchedBudgets, loading } = useBudgets(true);
  const [archivedBudgets, setArchivedBudgets] = useState(fetchedBudgets);

  useEffect(() => {
    setArchivedBudgets(fetchedBudgets);
  }, [fetchedBudgets]);

  if (loading) return <LoadingSpinner text="Loading archives..." />;

  const handleRestore = async (budgetId: string) => {
    try {
      await fetch(`/api/budgets/${budgetId}/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: false }),
      });
      setArchivedBudgets(prev => prev.filter(b => b.id !== budgetId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Archived Budgets</h1>
      </div>

      {archivedBudgets.length > 0 ? (
        <div className={styles.grid}>
          {archivedBudgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              showRestore
              onRestore={() => handleRestore(budget.id)}
            />
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
