'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/shared/Input/Input';
import { Button } from '@/components/shared/Button/Button';
import { validateLoginForm } from './LoginForm.logic';
import './LoginForm.scss';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('[LoginForm] Field changed:', name);
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[LoginForm] Submitting form');

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      console.log('[LoginForm] Validation errors:', validationErrors);
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      console.log('[LoginForm] Attempting sign in');
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        console.error('[LoginForm] Sign in failed:', result.error);
        setGeneralError('Invalid email or password');
        setLoading(false);
        return;
      }

      console.log('[LoginForm] Sign in successful, redirecting to budgets');
      router.push('/budgets');
    } catch (error) {
      console.error('[LoginForm] Unexpected error:', error);
      setGeneralError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-form__header">
        <h1 className="login-form__title">Welcome Back</h1>
        <p className="login-form__subtitle">Sign in to manage your expenses</p>
      </div>

      {generalError && (
        <div className="login-form__error" role="alert">
          {generalError}
        </div>
      )}

      <div className="login-form__fields">
        <Input
          type="email"
          name="email"
          id="email"
          label="Email Address"
          placeholder="your.email@example.com"
          value={formData.email}
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
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={loading}
          autoComplete="current-password"
          fullWidth
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={loading}
        title="Sign in to your account"
        className="login-form__submit"
      >
        Sign In
      </Button>

      <p className="login-form__footer">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="login-form__link">
          Sign up
        </a>
      </p>
    </form>
  );
};