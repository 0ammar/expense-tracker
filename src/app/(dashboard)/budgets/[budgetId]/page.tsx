'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, ArrowLeft, Archive, Trash2 } from 'lucide-react';
import { BudgetWithStats } from '@/types/budget.types';
import { Transaction } from '@/types/transaction.types';
import { useTransactions } from '@/hooks/useTransactions';
import { useFilters } from '@/hooks/useFilters';
import { BudgetSummary, CategoryChart, TransactionFilters, TransactionList, AddTransactionModal, EditTransactionModal, DeleteTransactionModal, DeleteBudgetModal, Button, LoadingSpinner, } from '@/components';
import { TransactionType } from '@/types/transaction.types';

export default function BudgetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const budgetId = params.budgetId as string;
  const [budget, setBudget] = useState<BudgetWithStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { transactions, createTransaction, updateTransaction, deleteTransaction } = useTransactions(budgetId);
  const { filters, filteredTransactions, updateFilter, resetFilters } = useFilters(transactions);
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
        console.error('[BudgetDetailPage] Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, [budgetId, transactions]);

  const handleArchive = async () => {
    try {
      await fetch(`/api/budgets/${budgetId}/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: true }),
      });
      router.push('/budgets');
    } catch (error) {
      console.error('[BudgetDetailPage] Error archiving:', error);
    }
  };

  const handleDeleteBudget = async () => {
    try {
      await fetch(`/api/budgets/${budgetId}`, { method: 'DELETE' });
      router.push('/budgets');
    } catch (error) {
      console.error('[BudgetDetailPage] Error deleting budget:', error);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteModal(true);
  };

  const handleDeleteTransaction = async () => {
    if (selectedTransaction) {
      await deleteTransaction(selectedTransaction.id);
    }
  };

  if (loading || !budget) return <LoadingSpinner text="Loading budget..." />;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button variant="ghost" icon={<ArrowLeft size={20} />} onClick={() => router.push('/budgets')} title="Back to budgets" />
          <h1>{budget.name}</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="secondary" icon={<Archive size={18} />} onClick={handleArchive} title="Archive budget">Archive</Button>
          <Button variant="danger" icon={<Trash2 size={18} />} onClick={() => setShowDeleteBudgetModal(true)} title="Delete budget">Delete</Button>
        </div>
      </div>

      <BudgetSummary budget={budget} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmin(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <CategoryChart transactions={transactions} type={TransactionType.INCOME} />
        <CategoryChart transactions={transactions} type={TransactionType.EXPENSE} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Transactions</h2>
        <Button variant="primary" icon={<Plus size={20} />} onClick={() => setShowAddModal(true)}>Add Transaction</Button>
      </div>

      <TransactionFilters filters={filters} onFilterChange={updateFilter} onReset={resetFilters} />

      <div style={{ marginTop: '1.5rem' }}>
        <TransactionList transactions={filteredTransactions} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <AddTransactionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} budgetId={budgetId} onSubmit={createTransaction} />
      <EditTransactionModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} transaction={selectedTransaction} onSubmit={updateTransaction} />
      <DeleteTransactionModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} transaction={selectedTransaction} onConfirm={handleDeleteTransaction} />
      <DeleteBudgetModal isOpen={showDeleteBudgetModal} onClose={() => setShowDeleteBudgetModal(false)} budgetName={budget.name} onConfirm={handleDeleteBudget} />
    </div>
  );
}