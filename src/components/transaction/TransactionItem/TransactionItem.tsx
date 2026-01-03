import React from 'react';
import { Transaction, TransactionType } from '@/types/transaction.types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { getCategoryIcon } from '@/lib/constants';
import { TRANSACTION_ITEM_LABELS } from './TransactionItem.constants';
import './TransactionItem.scss';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: () => void;
  onDelete: () => void;
  style?: React.CSSProperties;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete,
  style,
}) => {
  console.log('[TransactionItem] Rendering transaction:', transaction.id);

  const isIncome = transaction.type === TransactionType.INCOME;

  return (
    <div className={`transaction-item transaction-item--${transaction.type.toLowerCase()}`} style={style}>
      <div className="transaction-item__icon">
        {getCategoryIcon(transaction.category)}
      </div>

      <div className="transaction-item__content">
        <div className="transaction-item__main">
          <h4 className="transaction-item__name">{transaction.name}</h4>
          {transaction.description && (
            <p className="transaction-item__description">{transaction.description}</p>
          )}
        </div>

        <div className="transaction-item__meta">
          <span className="transaction-item__category">{transaction.category}</span>
          <span className="transaction-item__date">{formatDate(transaction.date, 'MMM dd, yyyy')}</span>
        </div>
      </div>

      <div className="transaction-item__right">
        <span className={`transaction-item__amount transaction-item__amount--${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? '+' : '-'} {formatCurrency(Number(transaction.amount))}
        </span>

        <div className="transaction-item__actions">
          <button
            type="button"
            title={TRANSACTION_ITEM_LABELS.EDIT}
            onClick={onEdit}
            className="transaction-item__action transaction-item__action--edit"
            aria-label={`${TRANSACTION_ITEM_LABELS.EDIT} ${transaction.name}`}
          >
            ✏️
          </button>
          <button
            type="button"
            title={TRANSACTION_ITEM_LABELS.DELETE}
            onClick={onDelete}
            className="transaction-item__action transaction-item__action--delete"
            aria-label={`${TRANSACTION_ITEM_LABELS.DELETE} ${transaction.name}`}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};