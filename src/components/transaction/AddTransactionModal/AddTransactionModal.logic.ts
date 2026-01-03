interface TransactionFormData {
  name: string;
  amount: string;
  category: string;
  date: string;
}

export const validateTransactionForm = (data: TransactionFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.amount || parseFloat(data.amount) <= 0) errors.amount = 'Amount must be greater than 0';
  if (!data.category) errors.category = 'Category is required';
  if (!data.date) errors.date = 'Date is required';
  return errors;
};