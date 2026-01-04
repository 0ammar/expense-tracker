'use client';

import React, { useState } from 'react';
import { Modal, Input, Select, Button } from '@/components';
import { TransactionType, Transaction } from '@/types/transaction.types';
import { getCategoriesByType } from '@/lib/constants';
import { validateTransactionForm } from './AddTransactionModal.logic';
import './AddTransactionModal.scss';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgetId: string;
  onSubmit: (data: {
    budgetId: string;
    name?: string;
    amount: number;
    description?: string;
    date?: Date;
    category?: string;
    type?: TransactionType;
  }) => Promise<Transaction | null>;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, budgetId, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: TransactionType.EXPENSE,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const categories = getCategoriesByType(formData.type);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as TransactionType;
    setFormData((prev) => ({ ...prev, type: newType, category: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTransactionForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const submitData: {
        budgetId: string;
        amount: number;
        name?: string;
        description?: string;
        date?: Date;
        category?: string;
        type?: TransactionType;
      } = {
        budgetId,
        amount: parseFloat(formData.amount),
      };

      if (formData.name) submitData.name = formData.name;
      if (formData.description) submitData.description = formData.description;
      if (formData.date) submitData.date = new Date(formData.date);
      if (formData.category) submitData.category = formData.category;
      if (formData.type) submitData.type = formData.type;

      await onSubmit(submitData);
      
      setFormData({
        name: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        type: TransactionType.EXPENSE,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction" size="md">
      <form onSubmit={handleSubmit} className="add-transaction-modal">
        <div className="add-transaction-modal__fields">
          <Select
            name="type"
            label="Type"
            options={[
              { value: TransactionType.INCOME, label: 'Income' },
              { value: TransactionType.EXPENSE, label: 'Expense' },
            ]}
            value={formData.type}
            onChange={handleTypeChange}
            fullWidth
          />
          <Input
            type="text"
            name="name"
            label="Name"
            placeholder="e.g., Grocery Shopping"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            fullWidth
          />
          
          <div className="add-transaction-modal__row">
            <Input
              type="number"
              name="amount"
              label="Amount (JOD)"
              placeholder="0.000"
              step="0.001"
              value={formData.amount}
              onChange={handleChange}
              error={errors.amount}
              fullWidth
              required
            />
            <Input
              type="date"
              name="date"
              label="Date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              fullWidth
            />
          </div>

          <Select
            name="category"
            label="Category"
            options={[
              { value: '', label: 'Select category' },
              ...categories.map((cat) => ({ value: cat.value, label: cat.label })),
            ]}
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
            fullWidth
          />

          <div className="add-transaction-modal__textarea-wrapper">
            <label htmlFor="description" className="add-transaction-modal__label">Description (Optional)</label>
            <textarea
              name="description"
              id="description"
              placeholder="Add details..."
              value={formData.description}
              onChange={handleChange}
              className="add-transaction-modal__textarea"
              rows={3}
            />
          </div>
        </div>
        <div className="add-transaction-modal__actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading} disabled={loading}>
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};