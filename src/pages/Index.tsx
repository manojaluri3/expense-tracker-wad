import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Expense, ExpenseFilters } from "@/types";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseFiltersComponent from "@/components/ExpenseFilters";
import { filterExpenses, calculateTotal } from "@/utils/expense-utils";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LOCAL_STORAGE_KEY = "expenses";

const ExpenseTracker = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | undefined>(undefined);
  const [filters, setFilters] = useState<ExpenseFilters>({
    dateRange: { from: undefined, to: undefined },
    category: "",
    amountRange: { min: "", max: "" },
  });

  // Load expenses from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
    setFilteredExpenses(filterExpenses(expenses, filters));
    setTotal(calculateTotal(filteredExpenses));
  }, [expenses, filters, filteredExpenses]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, { ...expense, id: crypto.randomUUID() }]);
    setIsFormOpen(false);
    toast({ title: "Expense added!" });
  };

  const handleEditExpense = (updated: Expense) => {
    setExpenses(prev => prev.map(e => (e.id === updated.id ? updated : e)));
    setExpenseToEdit(undefined);
    setIsFormOpen(false);
    toast({ title: "Expense updated!" });
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    toast({ title: "Expense deleted!" });
  };

  const handleOpenAdd = () => {
    setExpenseToEdit(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (expense: Expense) => {
    setExpenseToEdit(expense);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setExpenseToEdit(undefined);
    setIsFormOpen(false);
  };

  const handleFilterChange = (newFilters: ExpenseFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <Button onClick={handleOpenAdd} className="bg-primary text-white hover:bg-primary/90">
          <PlusIcon className="mr-2" /> Add Expense
        </Button>
      </div>
      <div className="mb-4">
        <ExpenseFiltersComponent onFilterChange={handleFilterChange} />
      </div>
      <ExpenseList
        expenses={filteredExpenses}
        onEditExpense={handleOpenEdit}
        onDeleteExpense={handleDeleteExpense}
        total={total}
      />
      <ExpenseForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={expenseToEdit ? handleEditExpense : handleAddExpense}
        expenseToEdit={expenseToEdit}
      />
    </div>
  );
};

export default ExpenseTracker;
