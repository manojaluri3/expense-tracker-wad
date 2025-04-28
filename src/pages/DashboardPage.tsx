import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExpenseTracker from "@/pages/Index";
import { Expense } from "@/types";
import { TrendingUp, Calendar, BarChart2 } from "lucide-react";

const LOCAL_STORAGE_KEY = "expenses";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [avgPerDay, setAvgPerDay] = useState(0);

  const calculateStats = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const expenses: Expense[] = JSON.parse(stored);
      
      // Calculate total
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      setTotalExpenses(total);

      // Calculate this month's expenses
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // Adding 1 because months are 0-based
      const currentYear = now.getFullYear();
      const monthlyTotal = expenses
        .filter(e => {
          const [year, month] = e.date.split('-');
          return parseInt(month) === currentMonth && parseInt(year) === currentYear;
        })
        .reduce((sum, e) => sum + e.amount, 0);
      setMonthlyExpenses(monthlyTotal);

      // Calculate average per day
      if (expenses.length > 0) {
        const dates = expenses.map(e => new Date(e.date));
        const firstDate = new Date(Math.min(...dates.map(d => d.getTime())));
        const lastDate = new Date(Math.max(...dates.map(d => d.getTime())));
        const daysDiff = Math.max(1, Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
        setAvgPerDay(Math.round(total / daysDiff));
      } else {
        setAvgPerDay(0);
      }
    }
  };

  // Initial calculation
  useEffect(() => {
    calculateStats();
  }, []);

  // Add a listener for storage changes
  useEffect(() => {
    window.addEventListener('storage', calculateStats);
    // Also listen for changes in the current tab
    const interval = setInterval(calculateStats, 1000);
    
    return () => {
      window.removeEventListener('storage', calculateStats);
      clearInterval(interval);
    };
  }, []);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm text-gray-500 mb-1">Total Expenses</span>
            <span className="text-2xl font-bold text-blue-600">₹{totalExpenses.toLocaleString()}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Calendar className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm text-gray-500 mb-1">This Month</span>
            <span className="text-2xl font-bold text-green-600">₹{monthlyExpenses.toLocaleString()}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <BarChart2 className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-sm text-gray-500 mb-1">Average/Day</span>
            <span className="text-2xl font-bold text-orange-600">₹{avgPerDay.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ExpenseTracker />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
