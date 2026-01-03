'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BudgetWithStats } from '@/types/budget.types';
import { formatCurrency } from '@/lib/formatters';
import { Card } from '@/components/shared/Card/Card';
import { BUDGET_CARD_LABELS } from './BudgetCard.constants';
import './BudgetCard.scss';

interface BudgetCardProps {
  budget: BudgetWithStats;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log('[BudgetCard] Navigating to budget:', budget.id);
    router.push(`/budgets/${budget.id}`);
  };

  return (
    <Card variant="interactive" onClick={handleClick} className="budget-card">
      <div className="budget-card__header">
        <h3 className="budget-card__title">{budget.name}</h3>
        <span className="budget-card__count">
          {budget.transactionCount} {BUDGET_CARD_LABELS.TRANSACTIONS}
        </span>
      </div>

      <div className="budget-card__balance">
        <span className="budget-card__balance-label">{BUDGET_CARD_LABELS.NET_BALANCE}</span>
        <span className={`budget-card__balance-amount ${budget.netBalance >= 0 ? 'positive' : 'negative'}`}>
          {formatCurrency(budget.netBalance)}
        </span>
      </div>

      <div className="budget-card__stats">
        <div className="budget-card__stat budget-card__stat--income">
          <span className="budget-card__stat-icon">↗</span>
          <div className="budget-card__stat-content">
            <span className="budget-card__stat-label">{BUDGET_CARD_LABELS.INCOME}</span>
            <span className="budget-card__stat-value">{formatCurrency(budget.totalIncome)}</span>
          </div>
        </div>

        <div className="budget-card__stat budget-card__stat--expense">
          <span className="budget-card__stat-icon">↘</span>
          <div className="budget-card__stat-content">
            <span className="budget-card__stat-label">{BUDGET_CARD_LABELS.EXPENSE}</span>
            <span className="budget-card__stat-value">{formatCurrency(budget.totalExpense)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};