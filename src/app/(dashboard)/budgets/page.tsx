'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useBudgets } from '@/hooks/useBudgets';
import { BudgetCard, CreateBudgetModal, EditBudgetModal, Button, LoadingSpinner } from '@/components';
import styles from './page.module.scss';
import { Budget } from '@/types/budget.types';

export default function BudgetsPage() {
  const { data: session } = useSession();
  const { budgets, loading, createBudget, updateBudget } = useBudgets(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  if (loading) return <LoadingSpinner text="Loading budgets..." />;

  const handleEdit = (budget: Budget) => {
    setSelectedBudget(budget);
    setShowEditModal(true);
  };

  const handleUpdate = async (data: { name?: string }) => {
    if (!selectedBudget) return;
    await updateBudget({ id: selectedBudget.id, name: data.name });
  };

  return (
    <div className={styles.budgetsPage}>
      {session?.user?.name && (
        <div className={styles.welcome}>
          <p>Welcome back, <strong>{session.user.name}</strong></p>
        </div>
      )}
      
      <div className={styles.header}>
        <h1>My Budgets</h1>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => setShowCreateModal(true)}
          className={styles.createBtn}
        >
          Create Budget
        </Button>
      </div>

      <div className={styles.grid}>
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            showEdit
            onEdit={() => handleEdit(budget)}
          />
        ))}
      </div>

      <CreateBudgetModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={createBudget}
      />

      <EditBudgetModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        budget={selectedBudget}
        onSubmit={handleUpdate}
      />
    </div>
  );
}