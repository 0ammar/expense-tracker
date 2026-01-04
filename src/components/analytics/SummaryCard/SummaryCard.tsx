'use client';

import React from 'react';
import { formatCurrency } from '@/lib/formatters';
import './SummaryCard.scss';

interface SummaryCardProps {
  title: string;
  value: number;
  type: 'success' | 'danger' | 'info';
  icon: React.ReactNode;
  isCurrency?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, type, icon, isCurrency = true }) => {
  return (
    <div className={`summary-card summary-card--${type}`}>
      <div className="summary-card__icon">{icon}</div>
      <div className="summary-card__content">
        <p>{title}</p>
        <h3>{isCurrency ? formatCurrency(value) : value}</h3>
      </div>
    </div>
  );
};