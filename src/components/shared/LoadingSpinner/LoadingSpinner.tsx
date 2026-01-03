import React from 'react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
}) => {
  console.log('[LoadingSpinner] Rendering spinner');

  return (
    <div className="loading-spinner-wrapper">
      <div className={`loading-spinner loading-spinner--${size} loading-spinner--${color}`} />
      {text && <p className="loading-spinner__text">{text}</p>}
    </div>
  );
};