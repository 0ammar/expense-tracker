import React, { forwardRef } from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    console.log('[Input] Rendering:', props.name || props.placeholder);
    
    return (
      <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full' : ''} ${className}`}>
        {label && (
          <label htmlFor={props.id || props.name} className="input-wrapper__label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`input ${error ? 'input--error' : ''}`}
          aria-describedby={error ? `${props.name}-error` : undefined}
          {...props}
        />
        {error && (
          <span id={`${props.name}-error`} className="input-wrapper__error" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="input-wrapper__helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';