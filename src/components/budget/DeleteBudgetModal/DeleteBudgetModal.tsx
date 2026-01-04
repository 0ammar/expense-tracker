'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal, Button } from '@/components';
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
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Budget" size="sm">
      <div className="delete-budget">
        <div className="delete-budget__warning">
          <AlertTriangle size={20} />
          <p>Are you sure you want to delete <strong>{budgetName}</strong>?</p>
        </div>
        <p className="delete-budget__info">
          This action cannot be undone. All transactions will be deleted.
        </p>
        <div className="delete-budget__actions">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" loading={loading} onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};