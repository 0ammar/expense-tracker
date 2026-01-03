'use client';

import React from 'react';
import { BudgetWithStats } from '@/types/budget.types';
import { SummaryCard } from '@/components/analytics/SummaryCard/SummaryCard';
import { BUDGET_SUMMARY_LABELS } from './BudgetSummary.constants';
import './BudgetSummary.scss';

interface BudgetSummaryProps {
  budget: BudgetWithStats;
}

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({ budget }) => {
  console.log('[BudgetSummary] Rendering summary for budget:', budget.id);

  return (
    <div className="budget-summary">
      <SummaryCard
        title={BUDGET_SUMMARY_LABELS.NET_BALANCE}
        value={budget.netBalance}
        type={budget.netBalance >= 0 ? 'success' : 'danger'}
        icon="💰"
      />

      <SummaryCard
        title={BUDGET_SUMMARY_LABELS.TOTAL_INCOME}
        value={budget.totalIncome}
        type="success"
        icon="↗"
      />

      <SummaryCard
        title={BUDGET_SUMMARY_LABELS.TOTAL_EXPENSE}
        value={budget.totalExpense}
        type="danger"
        icon="↘"
      />

      <SummaryCard
        title={BUDGET_SUMMARY_LABELS.TRANSACTIONS}
        value={budget.transactionCount}
        type="info"
        icon="📊"
        isCurrency={false}
      />
    </div>
  );
};