'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, ArrowLeft, Archive, Trash2 } from 'lucide-react';
import { BudgetWithStats, Transaction, TransactionType } from '@/types';
import { useTransactions, useFilters } from '@/hooks';
import {
  BudgetSummary,
  TransactionFilters,
  TransactionList,
  AddTransactionModal,
  EditTransactionModal,
  DeleteTransactionModal,
  DeleteBudgetModal,
  Button,
  LoadingSpinner,
} from '@/components';
import styles from './page.module.scss';

export default function BudgetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const budgetId = params.budgetId as string;
  const [budget, setBudget] = useState<BudgetWithStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { transactions, createTransaction, updateTransaction, deleteTransaction } = useTransactions(budgetId);
  const { filters, filteredTransactions, updateFilter } = useFilters(transactions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await fetch(`/api/budgets/${budgetId}`);
        const data = await res.json();
        setBudget(data.budget);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, [budgetId, transactions]);

  const handleArchive = async () => {
    await fetch(`/api/budgets/${budgetId}/archive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isArchived: true }),
    });
    router.push('/budgets');
  };

  const handleDeleteBudget = async () => {
    await fetch(`/api/budgets/${budgetId}`, { method: 'DELETE' });
    router.push('/budgets');
  };

  const handleDeleteTransaction = async () => {
    if (!selectedTransaction) return;
    await deleteTransaction(selectedTransaction.id);
    setShowDeleteModal(false);
    setSelectedTransaction(null);
  };

  if (loading || !budget) return <LoadingSpinner text="Loading..." />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Button variant="ghost" icon={<ArrowLeft size={18} />} onClick={() => router.push('/budgets')} />
          <h1>{budget.name}</h1>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" icon={<Archive size={16} />} onClick={handleArchive}>
            Archive
          </Button>
          <Button variant="danger" icon={<Trash2 size={16} />} onClick={() => setShowDeleteBudgetModal(true)}>
            Delete
          </Button>
        </div>
      </div>

      <div className={styles.summary}>
        <BudgetSummary budget={budget} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Transactions</h2>
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setShowAddModal(true)}>
            Add
          </Button>
        </div>

        <div className={styles.filters}>
          <TransactionFilters filters={filters} onFilterChange={updateFilter} />
        </div>

        <TransactionList 
          transactions={filteredTransactions} 
          onEdit={(t) => { setSelectedTransaction(t); setShowEditModal(true); }} 
          onDelete={(t) => { setSelectedTransaction(t); setShowDeleteModal(true); }} 
        />
      </div>

      <AddTransactionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} budgetId={budgetId} onSubmit={createTransaction} />
      <EditTransactionModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} transaction={selectedTransaction} onSubmit={updateTransaction} />
      <DeleteTransactionModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} transaction={selectedTransaction} onConfirm={handleDeleteTransaction} />
      <DeleteBudgetModal isOpen={showDeleteBudgetModal} onClose={() => setShowDeleteBudgetModal(false)} budgetName={budget.name} onConfirm={handleDeleteBudget} />
    </div>
  );
}