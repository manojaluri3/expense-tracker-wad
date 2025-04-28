
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Expense, ExpenseFilters } from "@/types";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseFiltersComponent from "@/components/ExpenseFilters";
import { filterExpenses, calculateTotal } from "@/utils/expense-utils";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ExpenseTracker = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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

  // Fetch user's expenses on initial load
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('expenses')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (data) {
          setExpenses(data as Expense[]);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching expenses",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpenses();
  }, [user, toast]);
  
  // Apply filters whenever expenses or filters change
  useEffect(() => {
    const filtered = filterExpenses(expenses, filters);
    setFilteredExpenses(filtered);
    setTotal(calculateTotal(filtered));
  }, [expenses, filters]);

  const handleFilterChange = useCallback((newFilters: ExpenseFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSaveExpense = async (expense: Expense) => {
    if (!user) return;
    
    try {
      if (expenseToEdit) {
        // Edit existing expense
        const { error } = await supabase
          .from('expenses')
          .update({
            date: expense.date,
            description: expense.description,
            category: expense.category,
            amount: expense.amount
          })
          .eq('id', expense.id);
          
        if (error) throw error;
        
        setExpenses((prev) =>
          prev.map((e) => (e.id === expense.id ? expense : e))
        );
        
        toast({
          title: "Expense updated",
          description: "The expense has been successfully updated.",
        });
      } else {
        // Add new expense
        const newExpense = {
          ...expense,
          user_id: user.id
        };
        
        const { data, error } = await supabase
          .from('expenses')
          .insert([newExpense])
          .select();
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setExpenses((prev) => [...prev, data[0] as Expense]);
        }
        
        toast({
          title: "Expense added",
          description: "The expense has been successfully added.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setExpenseToEdit(undefined);
    setIsAddingExpense(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setExpenseToEdit(expense);
    setIsAddingExpense(true);
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      
      toast({
        title: "Expense deleted",
        description: "The expense has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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
        isLoading={isLoading}
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
