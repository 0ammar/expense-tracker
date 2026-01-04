import { TransactionType } from "@/types/transaction.types";
import {
  Briefcase,
  Code,
  TrendingUp,
  Gift,
  DollarSign,
  UtensilsCrossed,
  Car,
  Home,
  Zap,
  Heart,
  Gamepad2,
  ShoppingBag,
  GraduationCap,
  Package,
} from "lucide-react";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const INCOME_CATEGORIES = [
  { value: "Salary", label: "Salary", icon: Briefcase },
  { value: "Freelance", label: "Freelance", icon: Code },
  { value: "Investment", label: "Investment", icon: TrendingUp },
  { value: "Gift", label: "Gift", icon: Gift },
  { value: "Other", label: "Other", icon: DollarSign },
];

export const EXPENSE_CATEGORIES = [
  { value: "Food & Dining", label: "Food & Dining", icon: UtensilsCrossed },
  { value: "Transportation", label: "Transportation", icon: Car },
  { value: "Housing", label: "Housing", icon: Home },
  { value: "Utilities", label: "Utilities", icon: Zap },
  { value: "Healthcare", label: "Healthcare", icon: Heart },
  { value: "Entertainment", label: "Entertainment", icon: Gamepad2 },
  { value: "Shopping", label: "Shopping", icon: ShoppingBag },
  { value: "Education", label: "Education", icon: GraduationCap },
  { value: "Other", label: "Other", icon: Package },
];

export const getCategoriesByType = (type: TransactionType) => {
  return type === TransactionType.INCOME
    ? INCOME_CATEGORIES
    : EXPENSE_CATEGORIES;
};

export const getCategoryIcon = (category: string) => {
  const allCategories = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
  const found = allCategories.find((cat) => cat.value === category);
  return found?.icon || Package;
};

export const CURRENCY_SYMBOL = "JOD";
export const CURRENCY_LOCALE = "en-JO";
