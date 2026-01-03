import React, { forwardRef } from 'react';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, fullWidth = false, className = '', ...props }, ref) => {
    console.log('[Select] Rendering:', props.name);

    return (
      <div className={`select-wrapper ${fullWidth ? 'select-wrapper--full' : ''} ${className}`}>
        {label && (
          <label htmlFor={props.id || props.name} className="select-wrapper__label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`select ${error ? 'select--error' : ''}`}
          aria-describedby={error ? `${props.name}-error` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span id={`${props.name}-error`} className="select-wrapper__error" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="select-wrapper__helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';