
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Expense, ExpenseFilters } from "@/types";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseFiltersComponent from "@/components/ExpenseFilters";
import { filterExpenses, calculateTotal } from "@/utils/expense-utils";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample initial data
const initialExpenses: Expense[] = [
  {
    id: "1",
    date: "2025-04-15",
    description: "Grocery Shopping",
    category: "Food",
    amount: 85.43,
  },
  {
    id: "2",
    date: "2025-04-10",
    description: "Movie Tickets",
    category: "Entertainment",
    amount: 24.99,
  },
  {
    id: "3",
    date: "2025-04-05",
    description: "Electricity Bill",
    category: "Utilities",
    amount: 120.50,
  },
  {
    id: "4",
    date: "2025-04-02",
    description: "Gasoline",
    category: "Transportation",
    amount: 45.75,
  },
];

const ExpenseTracker = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    // Try to load expenses from local storage
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : initialExpenses;
  });
  
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [total, setTotal] = useState<number>(calculateTotal(expenses));
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<ExpenseFilters>({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    category: "",
    amountRange: {
      min: "",
      max: "",
    },
  });

  // Save expenses to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  
  // Apply filters whenever expenses or filters change
  useEffect(() => {
    const filtered = filterExpenses(expenses, filters);
    setFilteredExpenses(filtered);
    setTotal(calculateTotal(filtered));
  }, [expenses, filters]);

  const handleFilterChange = useCallback((newFilters: ExpenseFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSaveExpense = (expense: Expense) => {
    if (expenseToEdit) {
      // Edit existing expense
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? expense : e))
      );
      toast({
        title: "Expense updated",
        description: "The expense has been successfully updated.",
      });
    } else {
      // Add new expense
      setExpenses((prev) => [...prev, expense]);
      toast({
        title: "Expense added",
        description: "The expense has been successfully added.",
      });
    }
    setExpenseToEdit(undefined);
  };

  const handleEditExpense = (expense: Expense) => {
    setExpenseToEdit(expense);
    setIsAddingExpense(true);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    toast({
      title: "Expense deleted",
      description: "The expense has been successfully deleted.",
    });
  };

  const closeForm = () => {
    setIsAddingExpense(false);
    setExpenseToEdit(undefined);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-screen-xl">
      <div className="flex justify-between items-center mb-8">
        <h1>Expense Tracker</h1>
        <Button onClick={() => setIsAddingExpense(true)} className="flex gap-2">
          <PlusIcon size={16} />
          Add Expense
        </Button>
      </div>

      <ExpenseFiltersComponent onFilterChange={handleFilterChange} />

      <ExpenseList
        expenses={filteredExpenses}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
        total={total}
      />

      <ExpenseForm
        isOpen={isAddingExpense}
        onClose={closeForm}
        onSave={handleSaveExpense}
        expenseToEdit={expenseToEdit}
      />
    </div>
  );
};

export default ExpenseTracker;
