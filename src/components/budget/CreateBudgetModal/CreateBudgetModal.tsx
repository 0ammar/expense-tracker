'use client';

import React, { useState } from 'react';
import { Modal, Input, Select, Button } from '@/components';
import { Budget } from '@/types/budget.types';
import { getMonthOptions, getYearOptions } from './CreateBudgetModal.logic';
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'name' ? value : parseInt(value, 10) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
      setForm({ name: '', month: now.getMonth() + 1, year: now.getFullYear() });
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
          label="Budget Name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          fullWidth
          required
        />

        <div className="form-row">
          <Select
            name="month"
            label="Month"
            options={getMonthOptions()}
            value={form.month.toString()}
            onChange={handleChange}
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