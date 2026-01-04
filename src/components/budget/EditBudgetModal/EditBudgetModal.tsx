'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from '@/components';
import { Budget } from '@/types/budget.types';
import './EditBudgetModal.scss';

interface EditBudgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    budget: Budget | null;
    onSubmit: (data: { name: string }) => Promise<void>;
}

export const EditBudgetModal: React.FC<EditBudgetModalProps> = ({ isOpen, onClose, budget, onSubmit }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (budget) setName(budget.name || '');
    }, [budget]);

    const handleSubmit = async () => {
        await onSubmit({ name: name.trim() || '' });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Budget" size="sm">
            <div className="edit-budget-modal">
                <Input
                    name="name"
                    label="Budget Name (optional)"
                    value={name}
                    placeholder="Enter budget name (optional)"
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <div className="edit-budget-modal__actions">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
