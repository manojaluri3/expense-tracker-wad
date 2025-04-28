import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Expense } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

const LOCAL_STORAGE_KEY = "expenses";

const AnalyticsPage = () => {
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState({ start: "", end: "", category: undefined });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed: Expense[] = JSON.parse(stored);
      setExpenses(parsed);
      setCategories(Array.from(new Set(parsed.map(e => e.category))));
    }
  }, []);

  // Filter expenses based on filters
  const filteredExpenses = expenses.filter(e => {
    const dateOk = (!filters.start || new Date(e.date) >= new Date(filters.start)) &&
      (!filters.end || new Date(e.date) <= new Date(filters.end));
    const catOk = !filters.category || e.category === filters.category;
    return dateOk && catOk;
  });

  // Top spending categories
  const categoryTotals: { [cat: string]: number } = {};
  filteredExpenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, amount]) => ({ name, amount }));

  // Monthly spending trends
  const monthlyTotals: { [month: string]: number } = {};
  filteredExpenses.forEach(e => {
    const month = e.date.slice(0, 7); // YYYY-MM
    monthlyTotals[month] = (monthlyTotals[month] || 0) + e.amount;
  });
  const topMonth = Object.entries(monthlyTotals)
    .sort((a, b) => b[1] - a[1])[0];

  // Prepare data for charts
  const categoryChartData = topCategories;
  const monthlyChartData = Object.entries(monthlyTotals).map(([month, amount]) => ({ month, amount }));
  const dailyChartData = (() => {
    const dailyTotals: { [date: string]: number } = {};
    filteredExpenses.forEach(e => {
      dailyTotals[e.date] = (dailyTotals[e.date] || 0) + e.amount;
    });
    return Object.entries(dailyTotals).map(([date, amount]) => ({ date, amount }));
  })();

  const suggestions = [
    "Consider reviewing spending in your top category to find potential savings",
    "Track your expenses regularly to maintain awareness of your spending habits",
    "Set budget targets for each spending category",
  ];

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold mb-6">Expense Insights</h1>

          {/* Filter Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Filter Insights</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <div className="relative">
                  <Input type="date" className="pr-10" placeholder="dd-mm-yyyy" value={filters.start} onChange={e => setFilters(f => ({ ...f, start: e.target.value }))} />
                  <CalendarIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">End Date</label>
                <div className="relative">
                  <Input type="date" className="pr-10" placeholder="dd-mm-yyyy" value={filters.end} onChange={e => setFilters(f => ({ ...f, end: e.target.value }))} />
                  <CalendarIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select value={filters.category} onValueChange={val => setFilters(f => ({ ...f, category: val }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setFilters({ start: "", end: "", category: undefined })}>Reset</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setFilters({ ...filters })}>Apply Filters</Button>
            </div>
          </div>

          {/* Insights Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Top Spending Categories */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Top Spending Categories</h3>
              {topCategories.length === 0 && <div className="text-gray-400">No data</div>}
              {topCategories.map((cat, idx) => (
                <div key={cat.name} className="mb-4 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <span>{cat.name}</span>
                    <span className="font-semibold">₹{cat.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${idx === 0 ? "bg-blue-600" : "bg-blue-400"}`}
                      style={{ width: `${(cat.amount / topCategories[0].amount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Monthly Spending Trends */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Monthly Spending Trends</h3>
              {topMonth ? (
                <>
                  <div className="flex justify-between mb-1">
                    <span>{topMonth[0]}</span>
                    <span className="font-semibold">₹{topMonth[1].toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-green-500 rounded-full"></div>
                </>
              ) : (
                <div className="text-gray-400">No data</div>
              )}
            </div>
          </div>

          {/* Graphical Analysis Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Bar Chart for Categories */}
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="text-md font-semibold mb-2 text-blue-700">Category-wise Expenses (Bar Chart)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Line Chart for Monthly Trends */}
            <div className="bg-white rounded-lg shadow p-4">
              <h4 className="text-md font-semibold mb-2 text-green-700">Monthly Trends (Line Chart)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#22c55e" />
                    <YAxis stroke="#22c55e" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Daily Line Chart */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h4 className="text-md font-semibold mb-2 text-purple-700">Daily Expenses (Line Chart)</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#a21caf" />
                  <YAxis stroke="#a21caf" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#a21caf" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Money-Saving Suggestions</h3>
            <ul className="space-y-2">
              {suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span role="img" aria-label="bulb">💡</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsPage; 