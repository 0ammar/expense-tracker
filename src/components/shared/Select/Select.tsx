import React, { forwardRef } from 'react';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, fullWidth, className = '', ...props }, ref) => {
    return (
      <div className={`select-wrapper ${fullWidth ? 'select-wrapper--full' : ''} ${className}`}>
        {label && <label className="select-wrapper__label">{label}</label>}
        <select ref={ref} className={`select ${error ? 'select--error' : ''}`} {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <span className="select-wrapper__error">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';