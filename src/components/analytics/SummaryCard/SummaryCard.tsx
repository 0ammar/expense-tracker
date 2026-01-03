import React from 'react';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { Card } from '@/components/shared/Card/Card';
import './SummaryCard.scss';

interface SummaryCardProps {
  title: string;
  value: number;
  type?: 'success' | 'danger' | 'warning' | 'info';
  icon?: string;
  isCurrency?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  type = 'info',
  icon,
  isCurrency = true,
}) => {
  console.log('[SummaryCard] Rendering:', title, value);

  const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value);

  return (
    <Card className={`summary-card summary-card--${type}`}>
      <div className="summary-card__header">
        {icon && <span className="summary-card__icon">{icon}</span>}
        <h3 className="summary-card__title">{title}</h3>
      </div>
      <p className="summary-card__value">{formattedValue}</p>
    </Card>
  );
};