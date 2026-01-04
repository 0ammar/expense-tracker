'use client';

import { Transaction } from '@/types/transaction.types';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import './TransactionList.scss';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="transaction-list-empty">
        <p>No transactions found</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};