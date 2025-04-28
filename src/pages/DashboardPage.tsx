
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExpenseTracker from "@/pages/Index";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ExpenseTracker />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
