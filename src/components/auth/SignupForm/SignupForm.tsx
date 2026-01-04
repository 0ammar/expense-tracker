'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components';
import { validateSignupForm, getPasswordStrength } from './SignupForm.logic';
import './SignupForm.scss';

export const SignupForm: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const strength = getPasswordStrength(form.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignupForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrors({ general: data.error || 'Signup failed' });
      setLoading(false);
    } else {
      router.push('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__header">
        <h1>Create Account</h1>
        <p>Get started for free</p>
      </div>

      {errors.general && <div className="auth-form__error">{errors.general}</div>}

      <div className="auth-form__fields">
        <Input 
          type="text" 
          name="name" 
          label="Full Name" 
          value={form.name} 
          onChange={handleChange} 
          error={errors.name} 
          disabled={loading} 
          autoComplete="name" 
          fullWidth 
          required 
        />
        <Input 
          type="email" 
          name="email" 
          label="Email" 
          value={form.email} 
          onChange={handleChange} 
          error={errors.email} 
          disabled={loading} 
          autoComplete="email" 
          fullWidth 
          required 
        />
        <div>
          <Input 
            type="password" 
            name="password" 
            label="Password" 
            value={form.password} 
            onChange={handleChange} 
            error={errors.password} 
            disabled={loading} 
            autoComplete="new-password" 
            fullWidth 
            required 
          />
          {form.password && (
            <div className="password-strength">
              <div className={`password-strength__bar password-strength__bar--${strength.level}`}>
                <div className="password-strength__fill" style={{ width: `${strength.score}%` }} />
              </div>
              <span className={`password-strength__text password-strength__text--${strength.level}`}>{strength.label}</span>
            </div>
          )}
        </div>
        <Input 
          type="password" 
          name="confirmPassword" 
          label="Confirm Password" 
          value={form.confirmPassword} 
          onChange={handleChange} 
          error={errors.confirmPassword} 
          disabled={loading} 
          autoComplete="new-password" 
          fullWidth 
          required 
        />
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-form__submit">
        Sign Up
      </Button>

      <p className="auth-form__footer">
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </form>
  );
};