'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/shared/Input/Input';
import { Button } from '@/components/shared/Button/Button';
import { validateSignupForm } from './SignupForm.logic';
import './SignupForm.scss';

export const SignupForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('[SignupForm] Field changed:', name);
    
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
    console.log('[SignupForm] Submitting form');

    const validationErrors = validateSignupForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      console.log('[SignupForm] Validation errors:', validationErrors);
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      console.log('[SignupForm] Creating new user');
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('[SignupForm] Signup failed:', data.error);
        setGeneralError(data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      console.log('[SignupForm] Signup successful, redirecting to login');
      router.push('/login?message=Account created successfully. Please sign in.');
    } catch (error) {
      console.error('[SignupForm] Unexpected error:', error);
      setGeneralError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="signup-form__header">
        <h1 className="signup-form__title">Create Account</h1>
        <p className="signup-form__subtitle">Start tracking your expenses today</p>
      </div>

      {generalError && (
        <div className="signup-form__error" role="alert">
          {generalError}
        </div>
      )}

      <div className="signup-form__fields">
        <Input
          type="text"
          name="name"
          id="name"
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
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
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={loading}
          autoComplete="new-password"
          fullWidth
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          disabled={loading}
          autoComplete="new-password"
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
        title="Create your account"
        className="signup-form__submit"
      >
        Sign Up
      </Button>

      <p className="signup-form__footer">
        Already have an account?{' '}
        <a href="/login" className="signup-form__link">
          Sign in
        </a>
      </p>
    </form>
  );
};