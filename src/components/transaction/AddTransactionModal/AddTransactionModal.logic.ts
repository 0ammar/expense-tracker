export const validateTransactionForm = (formData: {
  name: string;
  amount: string;
  description: string;
  date: string;
  category: string;
  type: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.amount || parseFloat(formData.amount) <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  return errors;
};