
import { Expense, ExpenseFilters } from "@/types";

export const categories = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Education",
  "Shopping",
  "Other"
];

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const filterExpenses = (
  expenses: Expense[],
  filters: ExpenseFilters
): Expense[] => {
  return expenses.filter((expense) => {
    // Filter by date range
    if (filters.dateRange.from || filters.dateRange.to) {
      const expenseDate = new Date(expense.date);
      
      if (filters.dateRange.from && expenseDate < filters.dateRange.from) {
        return false;
      }
      
      if (filters.dateRange.to) {
        const toDateEnd = new Date(filters.dateRange.to);
        toDateEnd.setHours(23, 59, 59, 999);
        if (expenseDate > toDateEnd) {
          return false;
        }
      }
    }

    // Filter by category
    if (filters.category && expense.category !== filters.category) {
      return false;
    }

    // Filter by amount range
    const minAmount = filters.amountRange.min ? parseFloat(filters.amountRange.min) : 0;
    const maxAmount = filters.amountRange.max ? parseFloat(filters.amountRange.max) : Infinity;
    
    if (expense.amount < minAmount || expense.amount > maxAmount) {
      return false;
    }

    return true;
  });
};

export const calculateTotal = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};
