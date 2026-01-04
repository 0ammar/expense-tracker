'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { BudgetWithStats } from '@/types/budget.types';
import { formatCurrency } from '@/lib/formatters';
import { Card } from '@/components';
import './BudgetCard.scss';

interface BudgetCardProps {
  budget: BudgetWithStats;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  const router = useRouter();

  return (
    <Card variant="interactive" onClick={() => router.push(`/budgets/${budget.id}`)} className="budget-card">
      <div className="budget-card__header">
        <h3>{budget.name}</h3>
        <div className="budget-card__badge">
          <FileText size={12} />
          <span>{budget.transactionCount}</span>
        </div>
      </div>

      <div className="budget-card__balance">
        <Wallet size={18} />
        <div>
          <span>Net Balance</span>
          <h2 className={budget.netBalance >= 0 ? 'positive' : 'negative'}>
            {formatCurrency(budget.netBalance)}
          </h2>
        </div>
      </div>

      <div className="budget-card__stats">
        <div className="stat">
          <TrendingUp size={14} className="icon-success" />
          <div>
            <span>Income</span>
            <strong>{formatCurrency(budget.totalIncome)}</strong>
          </div>
        </div>
        <div className="stat">
          <TrendingDown size={14} className="icon-danger" />
          <div>
            <span>Expense</span>
            <strong>{formatCurrency(budget.totalExpense)}</strong>
          </div>
        </div>
      </div>
    </Card>
  );
};