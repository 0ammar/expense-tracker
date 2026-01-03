'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBudgets } from '@/hooks/useBudgets';
import { BudgetCard } from '@/components/budget/BudgetCard/BudgetCard';
import { CreateBudgetModal } from '@/components/budget/CreateBudgetModal/CreateBudgetModal';
import { Button } from '@/components/shared/Button/Button';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner/LoadingSpinner';

export default function BudgetsPage() {
  const { budgets, loading, createBudget } = useBudgets(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading) return <LoadingSpinner text="Loading budgets..." />;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>My Budgets</h1>
        <Button variant="primary" icon={<Plus size={20} />} onClick={() => setShowCreateModal(true)}>
          Create Budget
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>

      {budgets.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>No budgets yet. Create your first budget to get started!</p>
        </div>
      )}

      <CreateBudgetModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={createBudget} />
    </div>
  );
}