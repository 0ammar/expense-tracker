'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components';
import { validateLoginForm } from './LoginForm.logic';
import './LoginForm.scss';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = await signIn('credentials', { ...form, redirect: false });
    
    if (result?.error) {
      setErrors({ general: 'Invalid credentials' });
      setLoading(false);
    } else {
      router.push('/budgets');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__header">
        <h1>Welcome Back</h1>
        <p>Sign in to continue</p>
      </div>

      {errors.general && <div className="auth-form__error">{errors.general}</div>}

      <div className="auth-form__fields">
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
        <Input
          type="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          disabled={loading}
          autoComplete="current-password"
          fullWidth
          required
        />
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="auth-form__submit">
        Sign In
      </Button>

      <p className="auth-form__footer">
        Don&apos;t have an account? <a href="/signup">Sign up</a>
      </p>
    </form>
  );
};