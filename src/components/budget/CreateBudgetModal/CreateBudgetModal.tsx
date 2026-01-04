'use client';

import React, { useState } from 'react';
import { Modal, Input, Select, Button } from '@/components';
import { Budget } from '@/types/budget.types';
import { getMonthOptions, getYearOptions, generateDefaultBudgetName, validateBudgetForm } from './CreateBudgetModal.logic';
import './CreateBudgetModal.scss';

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; year: number; month: number }) => Promise<Budget | null>;
}

export const CreateBudgetModal: React.FC<CreateBudgetModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const now = new Date();
  const [form, setForm] = useState({
    name: '',
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'name' ? value : parseInt(value, 10) }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateBudgetForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const budgetName = form.name.trim() || generateDefaultBudgetName(form.month, form.year);
      
      await onSubmit({
        name: budgetName,
        month: form.month,
        year: form.year,
      });
      
      setForm({ name: '', month: now.getMonth() + 1, year: now.getFullYear() });
      setErrors({});
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Budget" size="md">
      <form onSubmit={handleSubmit} className="create-budget-form">
        <Input
          name="name"
          label="Budget Name (Optional)"
          placeholder="Leave blank for default name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          fullWidth
        />

        <div className="form-row">
          <Select
            name="month"
            label="Month"
            options={getMonthOptions()}
            value={form.month.toString()}
            onChange={handleChange}
            error={errors.month}
            disabled={loading}
            fullWidth
            required
          />
          <Select
            name="year"
            label="Year"
            options={getYearOptions()}
            value={form.year.toString()}
            onChange={handleChange}
            error={errors.year}
            disabled={loading}
            fullWidth
            required
          />
        </div>

        <div className="form-actions">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};