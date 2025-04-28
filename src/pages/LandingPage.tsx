import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary/90 to-purple-600 text-white">
        <div className="container px-4 py-32 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
              Track Your Expenses With Ease
            </h1>
            <p className="mb-8 text-xl">
              A simple and powerful way to manage your finances and stay on budget.
              Visualize spending patterns and make smarter financial decisions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="text-lg px-8">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Track Expenses</h3>
              <p className="text-muted-foreground">
                Easily record and categorize your daily expenses to keep track of where your money goes.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Visualize Spending</h3>
              <p className="text-muted-foreground">
                Get clear insights into your spending habits with beautiful charts and graphs.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your financial data stays private and secure with our advanced security features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to take control of your finances?</h2>
          <p className="mb-8 text-xl max-w-2xl mx-auto">
            Join thousands of users who have transformed their financial habits with our expense tracker.
          </p>
          <Link to="/login">
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-white text-primary hover:bg-white/90">
              Start Tracking Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
