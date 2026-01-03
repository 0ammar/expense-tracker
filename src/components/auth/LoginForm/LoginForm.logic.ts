import { isValidEmail } from '@/lib/utils';

interface LoginFormData {
  email: string;
  password: string;
}

export const validateLoginForm = (data: LoginFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  console.log('[LoginForm.logic] Validating form data');

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  console.log('[LoginForm.logic] Validation errors:', Object.keys(errors).length);
  return errors;
};