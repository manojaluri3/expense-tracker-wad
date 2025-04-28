
export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

export interface ExpenseFilters {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  category: string;
  amountRange: {
    min: string;
    max: string;
  };
}
