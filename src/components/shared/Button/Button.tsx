import React from 'react';
import './Button.scss';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  title,
  onClick,
  className = '',
  icon,
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      console.log('[Button] Clicked:', title || 'Untitled button');
      onClick();
    }
  };

  return (
    <button
      type={type}
      title={title}
      className={`button button--${variant} button--${size} ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={title}
    >
      {loading ? (
        <span className="button__spinner" />
      ) : (
        <>
          {icon && <span className="button__icon">{icon}</span>}
          {children && <span className="button__text">{children}</span>}
        </>
      )}
    </button>
  );
};