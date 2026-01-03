import { format, parseISO } from 'date-fns';
import { CURRENCY_SYMBOL, CURRENCY_LOCALE } from './constants';

export const formatCurrency = (amount: number): string => {
  try {
    return new Intl.NumberFormat(CURRENCY_LOCALE, {
      style: 'decimal',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(amount) + ` ${CURRENCY_SYMBOL}`;
  } catch (error) {
    console.error('[FORMATTER] Error formatting currency:', error);
    return `${amount.toFixed(3)} ${CURRENCY_SYMBOL}`;
  }
};

export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('[FORMATTER] Error formatting date:', error);
    return 'Invalid date';
  }
};

export const formatMonthYear = (month: number, year: number): string => {
  try {
    const date = new Date(year, month - 1, 1);
    return format(date, 'MMMM yyyy');
  } catch (error) {
    console.error('[FORMATTER] Error formatting month/year:', error);
    return `${month}/${year}`;
  }
};

export const formatNumber = (num: number): string => {
  try {
    return new Intl.NumberFormat(CURRENCY_LOCALE).format(num);
  } catch (error) {
    console.error('[FORMATTER] Error formatting number:', error);
    return num.toString();
  }
};