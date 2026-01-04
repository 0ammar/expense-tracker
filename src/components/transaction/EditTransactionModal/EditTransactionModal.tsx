'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from '@/components';
import { Transaction, TransactionType } from '@/types/transaction.types';
import { getCategoriesByType } from '@/lib/constants';
import { validateTransactionForm } from '../AddTransactionModal/AddTransactionModal.logic';
import './EditTransactionModal.scss';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSubmit: (id: string, data: {
    name?: string;
    amount?: number;
    description?: string;
    date?: Date;
    category?: string;
    type?: TransactionType;
  }) => Promise<Transaction | null>;
}

export const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ isOpen, onClose, transaction, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    date: '',
    category: '',
    type: TransactionType.EXPENSE,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        name: transaction.name ?? '', // Handle undefined
        amount: transaction.amount?.toString() ?? '', // Handle undefined
        description: transaction.description ?? '',
        date: transaction.date
          ? new Date(transaction.date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0], // Default to today
        category: transaction.category ?? '',
        type: transaction.type ?? TransactionType.EXPENSE, // Default type
      });
    }
  }, [transaction]);

  const categories = getCategoriesByType(formData.type);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction) return;
    const validationErrors = validateTransactionForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await onSubmit(transaction.id, {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date),
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Transaction" size="md">
      <form onSubmit={handleSubmit} className="edit-transaction-modal">
        <div className="edit-transaction-modal__fields">
          <Input
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            fullWidth
            required
          />

          <div className="edit-transaction-modal__row">
            <Input
              type="number"
              name="amount"
              label="Amount (JOD)"
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
              required
            />
          </div>

          <Select
            name="category"
            label="Category"
            options={[
              { value: '', label: 'Select category' },
              ...categories.map((cat) => ({ value: cat.value, label: cat.label }))
            ]}
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
            fullWidth
            required
          />

          <div className="edit-transaction-modal__textarea-wrapper">
            <label htmlFor="description" className="edit-transaction-modal__label">Description (Optional)</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="edit-transaction-modal__textarea"
              rows={3}
            />
          </div>
        </div>
        <div className="edit-transaction-modal__actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading} disabled={loading}>
            Update
          </Button>
        </div>
      </form>
    </Modal>
  );
};