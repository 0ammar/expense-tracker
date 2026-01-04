import { MONTHS } from '@/lib/constants';

interface BudgetFormData {
  name: string;
  month: number;
  year: number;
}

export const generateDefaultBudgetName = (month: number, year: number): string => {
  const monthName = MONTHS[month - 1];
  return `${monthName} ${year}`;
};

export const validateBudgetForm = (data: BudgetFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.month || data.month < 1 || data.month > 12) {
    errors.month = 'Invalid month selected';
  }

  if (!data.year || data.year < 2000 || data.year > 2100) {
    errors.year = 'Invalid year selected';
  }

  return errors;
};

export const getMonthOptions = () => {
  return MONTHS.map((month, index) => ({
    value: (index + 1).toString(),
    label: month,
  }));
};

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  for (let year = currentYear - 2; year <= currentYear + 5; year++) {
    years.push({
      value: year.toString(),
      label: year.toString(),
    });
  }
  
  return years;
};