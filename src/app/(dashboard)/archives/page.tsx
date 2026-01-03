'use client';

import React from 'react';
import { useBudgets } from '@/hooks/useBudgets';
import { BudgetCard, LoadingSpinner } from '@/components';

export default function ArchivesPage() {
  const { budgets, loading } = useBudgets(true);

  if (loading) return <LoadingSpinner text="Loading archives..." />;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Archived Budgets</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>

      {budgets.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>No archived budgets</p>
        </div>
      )}
    </div>
  );
}