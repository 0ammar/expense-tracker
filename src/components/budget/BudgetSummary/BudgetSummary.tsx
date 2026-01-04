'use client';

import React from 'react';
import { Wallet, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { BudgetWithStats } from '@/types/budget.types';
import { SummaryCard } from '@/components';
import './BudgetSummary.scss';

interface BudgetSummaryProps {
  budget: BudgetWithStats;
}

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({ budget }) => {
  return (
    <div className="budget-summary">
      <SummaryCard
        title="Net Balance"
        value={budget.netBalance}
        type={budget.netBalance >= 0 ? 'success' : 'danger'}
        icon={<Wallet size={20} />}
      />
      <SummaryCard
        title="Total Income"
        value={budget.totalIncome}
        type="success"
        icon={<TrendingUp size={20} />}
      />
      <SummaryCard
        title="Total Expense"
        value={budget.totalExpense}
        type="danger"
        icon={<TrendingDown size={20} />}
      />
      <SummaryCard
        title="Transactions"
        value={budget.transactionCount}
        type="info"
        icon={<FileText size={20} />}
        isCurrency={false}
      />
    </div>
  );
};