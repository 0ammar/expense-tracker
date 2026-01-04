'use client';

import { useRouter } from 'next/navigation';
import { Wallet, TrendingUp, TrendingDown, FileText, Calendar } from 'lucide-react';
import { BudgetWithStats } from '@/types/budget.types';
import { formatCurrency } from '@/lib/formatters';
import { MONTHS } from '@/lib/constants';
import { Card, Button } from '@/components';
import './BudgetCard.scss';

interface BudgetCardProps {
  budget: BudgetWithStats;
  showRestore?: boolean;
  onRestore?: () => void;
  showEdit?: boolean;
  onEdit?: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, showRestore, onRestore, showEdit, onEdit }) => {
  const router = useRouter();
  const monthName = MONTHS[budget.month - 1];
  const periodLabel = `${monthName} ${budget.year}`;

  return (
    <Card variant="interactive" onClick={() => router.push(`/budgets/${budget.id}`)} className="budget-card">
      <div className="budget-card__header">
        <h3>{budget.name}</h3>
        <div className="budget-card__badge">
          <FileText size={12} />
          <span>{budget.transactionCount}</span>
        </div>
      </div>

      <div className="budget-card__period">
        <Calendar size={14} />
        <span>{periodLabel}</span>
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

      {showRestore && onRestore && (
        <div className="budget-card__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onRestore();
            }}
          >
            Restore
          </Button>
        </div>
      )}
      {showEdit && onEdit && (
        <div className="budget-card__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            Edit
          </Button>
        </div>
      )}
    </Card>
  );
};