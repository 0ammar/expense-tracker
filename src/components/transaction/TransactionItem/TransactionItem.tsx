'use client';

import React from 'react';
import { Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction, TransactionType } from '@/types/transaction.types';
import { formatCurrency } from '@/lib/formatters';
import { getCategoryIcon } from '@/lib/constants';
import './TransactionItem.scss';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete }) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  const CategoryIcon = getCategoryIcon(transaction.category);

  return (
    <div className="transaction-item">
      <div className="transaction-item__left">
        <div className={`transaction-item__icon transaction-item__icon--${isIncome ? 'income' : 'expense'}`}>
          <CategoryIcon size={16} />
        </div>
        <div className="transaction-item__details">
          <p className="transaction-item__name">{transaction.name}</p>
          <p className="transaction-item__meta">
            {transaction.category} • {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
      <div className="transaction-item__right">
        <span className={`transaction-item__amount transaction-item__amount--${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
        </span>
        <div className="transaction-item__actions">
          <button className="transaction-item__action" onClick={() => onEdit(transaction)} title="Edit">
            <Edit size={14} />
          </button>
          <button className="transaction-item__action" onClick={() => onDelete(transaction)} title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};