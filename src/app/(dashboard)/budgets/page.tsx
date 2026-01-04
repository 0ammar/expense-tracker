'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBudgets } from '@/hooks/useBudgets';
import { BudgetCard, CreateBudgetModal, Button, LoadingSpinner } from '@/components';
import styles from './page.module.scss';

export default function BudgetsPage() {
  const { budgets, loading, createBudget } = useBudgets(false);
  const [showModal, setShowModal] = useState(false);

  if (loading) return <LoadingSpinner text="Loading budgets..." />;

  return (
    <div className={styles.budgetsPage}>
      <div className={styles.header}>
        <h1>My Budgets</h1>
        <Button 
          variant="primary" 
          icon={<Plus size={20} />} 
          onClick={() => setShowModal(true)}
          className={styles.createBtn}
        >
          <span>Create Budget</span>
        </Button>
      </div>

      {budgets.length > 0 ? (
        <div className={styles.grid}>
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No budgets yet. Create your first budget to get started!</p>
        </div>
      )}

      <CreateBudgetModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={createBudget} />
    </div>
  );
}