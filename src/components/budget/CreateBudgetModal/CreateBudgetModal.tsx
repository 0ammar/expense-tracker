'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/shared/Modal/Modal';
import { Input } from '@/components/shared/Input/Input';
import { Select } from '@/components/shared/Select/Select';
import { Button } from '@/components/shared/Button/Button';
import { Budget } from '@/types/budget.types';
import { validateBudgetForm, getMonthOptions, getYearOptions } from './CreateBudgetModal.logic';
import './CreateBudgetModal.scss';

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; year: number; month: number }) => Promise<Budget | null>;
}

export const CreateBudgetModal: React.FC<CreateBudgetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    name: '',
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log('[CreateBudgetModal] Field changed:', name, value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'name' ? value : parseInt(value, 10),
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[CreateBudgetModal] Submitting form:', formData);

    const validationErrors = validateBudgetForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      console.log('[CreateBudgetModal] Validation errors:', validationErrors);
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
      console.log('[CreateBudgetModal] Budget created successfully');
      
      setFormData({
        name: '',
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('[CreateBudgetModal] Error creating budget:', error);
      setErrors({ general: 'Failed to create budget. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Budget" size="md">
      <form onSubmit={handleSubmit} className="create-budget-modal">
        {errors.general && (
          <div className="create-budget-modal__error" role="alert">
            {errors.general}
          </div>
        )}

        <div className="create-budget-modal__fields">
          <Input
            type="text"
            name="name"
            id="budget-name"
            label="Budget Name"
            placeholder="e.g., January 2026"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={loading}
            fullWidth
            required
          />

          <div className="create-budget-modal__row">
            <Select
              name="month"
              id="budget-month"
              label="Month"
              options={getMonthOptions()}
              value={formData.month.toString()}
              onChange={handleChange}
              error={errors.month}
              disabled={loading}
              fullWidth
              required
            />

            <Select
              name="year"
              id="budget-year"
              label="Year"
              options={getYearOptions()}
              value={formData.year.toString()}
              onChange={handleChange}
              error={errors.year}
              disabled={loading}
              fullWidth
              required
            />
          </div>
        </div>

        <div className="create-budget-modal__actions">
          <Button
            type="button"
            title="Cancel"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            title="Create budget"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            Create Budget
          </Button>
        </div>
      </form>
    </Modal>
  );
};