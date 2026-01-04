'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal modal--${size}`}>
        {title && (
          <div className="modal__header">
            <h2>{title}</h2>
            <button onClick={onClose} className="modal__close" aria-label="Close">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.body
  );
};