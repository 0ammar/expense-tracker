import React from 'react';
import './Card.scss';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'interactive';
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, variant = 'default', onClick, className = '' }) => {
  return (
    <div
      className={`card card--${variant} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};