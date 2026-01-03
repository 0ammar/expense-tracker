import { TransactionType } from '@/types/transaction.types';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const INCOME_CATEGORIES = [
  { value: 'Salary', label: 'Salary', icon: '💼' },
  { value: 'Freelance', label: 'Freelance', icon: '💻' },
  { value: 'Investment', label: 'Investment', icon: '📈' },
  { value: 'Gift', label: 'Gift', icon: '🎁' },
  { value: 'Other', label: 'Other', icon: '💰' },
];

export const EXPENSE_CATEGORIES = [
  { value: 'Food & Dining', label: 'Food & Dining', icon: '🍔' },
  { value: 'Transportation', label: 'Transportation', icon: '🚗' },
  { value: 'Housing', label: 'Housing', icon: '🏠' },
  { value: 'Utilities', label: 'Utilities', icon: '💡' },
  { value: 'Healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'Entertainment', label: 'Entertainment', icon: '🎮' },
  { value: 'Shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'Education', label: 'Education', icon: '📚' },
  { value: 'Other', label: 'Other', icon: '📦' },
];

export const getCategoriesByType = (type: TransactionType) => {
  return type === TransactionType.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
};

export const getCategoryIcon = (category: string): string => {
  const allCategories = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
  const found = allCategories.find((cat) => cat.value === category);
  return found?.icon || '📌';
};

export const CURRENCY_SYMBOL = 'JOD';
export const CURRENCY_LOCALE = 'en-JO';