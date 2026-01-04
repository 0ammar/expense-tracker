'use client';

import React, { useState } from 'react';
import { Archive } from 'lucide-react';
import { Modal, Button } from '@/components';
import './ArchiveBudgetModal.scss';

interface ArchiveBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  budgetName: string;
}

export const ArchiveBudgetModal: React.FC<ArchiveBudgetModalProps> = ({ isOpen, onClose, onConfirm, budgetName }) => {
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
    <Modal isOpen={isOpen} onClose={onClose} title="Archive Budget" size="sm">
      <div className="archive-budget">
        <div className="archive-budget__message">
          <Archive size={20} />
          <p>Archive <strong>{budgetName}</strong>?</p>
        </div>
        <p className="archive-budget__info">You can restore it later from the Archives page.</p>
        <div className="archive-budget__actions">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" loading={loading} onClick={handleConfirm}>
            Archive
          </Button>
        </div>
      </div>
    </Modal>
  );
};