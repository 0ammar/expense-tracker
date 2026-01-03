'use client';

import React from 'react';
import { Transaction } from '@/types/transaction.types';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import { sortTransactionsByDate } from './TransactionList.logic';
import './TransactionList.scss';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  console.log('[TransactionList] Rendering', transactions.length, 'transactions');

  const sortedTransactions = sortTransactionsByDate(transactions);

  if (sortedTransactions.length === 0) {
    return (
      <div className="transaction-list transaction-list--empty">
        <p className="transaction-list__empty-message">No transactions yet</p>
        <p className="transaction-list__empty-subtitle">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <div className="transaction-list__header">
        <span className="transaction-list__count">{sortedTransactions.length} Transactions</span>
      </div>
      
      <div className="transaction-list__items">
        {sortedTransactions.map((transaction, index) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={() => onEdit(transaction)}
            onDelete={() => onDelete(transaction)}
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>
    </div>
  );
};