import React from 'react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  return (
    <div className="spinner-wrapper">
      <div className={`spinner spinner--${size}`}>
        <div className="spinner__circle" />
        <div className="spinner__circle" />
        <div className="spinner__circle" />
      </div>
      {text && <p className="spinner__text">{text}</p>}
    </div>
  );
};