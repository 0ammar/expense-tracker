export const validateSignupForm = (data: { name: string; email: string; password: string; confirmPassword: string }) => {
  const errors: Record<string, string> = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Invalid email';
  if (data.password.length < 6) errors.password = 'Min 6 characters';
  if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  return errors;
};

export const getPasswordStrength = (pwd: string) => {
  if (!pwd) return { score: 0, level: 'none', label: '' };
  let score = 0;
  if (pwd.length >= 6) score += 25;
  if (pwd.length >= 10) score += 25;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 25;
  if (/\d/.test(pwd) && /[!@#$%^&*]/.test(pwd)) score += 25;
  
  if (score <= 25) return { score, level: 'weak', label: 'Weak' };
  if (score <= 50) return { score, level: 'fair', label: 'Fair' };
  if (score <= 75) return { score, level: 'good', label: 'Good' };
  return { score, level: 'strong', label: 'Strong' };
};