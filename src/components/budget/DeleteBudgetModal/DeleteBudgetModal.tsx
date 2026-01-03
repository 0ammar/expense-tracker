'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/shared/Modal/Modal';
import { Button } from '@/components/shared/Button/Button';
import { DELETE_BUDGET_LABELS } from './DeleteBudgetModal.constants';
import './DeleteBudgetModal.scss';

interface DeleteBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  budgetName: string;
}

export const DeleteBudgetModal: React.FC<DeleteBudgetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  budgetName,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    console.log('[DeleteBudgetModal] Confirming deletion');
    setLoading(true);

    try {
      await onConfirm();
      console.log('[DeleteBudgetModal] Budget deleted successfully');
      onClose();
    } catch (error) {
      console.error('[DeleteBudgetModal] Error deleting budget:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={DELETE_BUDGET_LABELS.TITLE} size="sm">
      <div className="delete-budget-modal">
        <p className="delete-budget-modal__message">
          {DELETE_BUDGET_LABELS.MESSAGE} <strong>{budgetName}</strong>?
        </p>
        <p className="delete-budget-modal__warning">{DELETE_BUDGET_LABELS.WARNING}</p>

        <div className="delete-budget-modal__actions">
          <Button
            type="button"
            title="Cancel deletion"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {DELETE_BUDGET_LABELS.CANCEL}
          </Button>
          <Button
            type="button"
            title="Confirm deletion"
            variant="danger"
            loading={loading}
            disabled={loading}
            onClick={handleConfirm}
          >
            {DELETE_BUDGET_LABELS.CONFIRM}
          </Button>
        </div>
      </div>
    </Modal>
  );
};