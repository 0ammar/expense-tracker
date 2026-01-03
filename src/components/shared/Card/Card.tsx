import React from 'react';
import './Card.scss';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      console.log('[Card] Clicked');
      onClick();
    }
  };

  return (
    <div
      className={`card card--${variant} card--padding-${padding} ${className}`}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};