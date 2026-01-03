'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/shared/Modal/Modal';
import { Button } from '@/components/shared/Button/Button';
import { Transaction } from '@/types/transaction.types';
import { DELETE_TRANSACTION_LABELS } from './DeleteTransactionModal.constants';
import './DeleteTransactionModal.scss';

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onConfirm: () => Promise<void>;
}

export const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('[DeleteTransactionModal] Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!transaction) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={DELETE_TRANSACTION_LABELS.TITLE} size="sm">
      <div className="delete-transaction-modal">
        <p className="delete-transaction-modal__message">
          {DELETE_TRANSACTION_LABELS.MESSAGE} <strong>{transaction.name}</strong>?
        </p>
        <div className="delete-transaction-modal__actions">
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            {DELETE_TRANSACTION_LABELS.CANCEL}
          </Button>
          <Button type="button" variant="danger" loading={loading} disabled={loading} onClick={handleConfirm}>
            {DELETE_TRANSACTION_LABELS.CONFIRM}
          </Button>
        </div>
      </div>
    </Modal>
  );
};