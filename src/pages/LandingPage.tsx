
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 backdrop-blur-sm">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-accent/30">
        <div className="container px-4 mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center">Why Choose Our Expense Tracker?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="m16 12-4 4-4-4"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Easy Tracking</h3>
              <p className="text-muted-foreground">
                Record expenses quickly and efficiently. Categorize transactions with a few clicks.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Smart Analytics</h3>
              <p className="text-muted-foreground">
                Visualize your spending with powerful filters and see exactly where your money goes.
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

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-4">ExpenseTracker</h3>
              <p className="max-w-xs">
                The most intuitive expense tracking solution for individuals and small businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="mb-4 text-lg font-semibold text-white">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-lg font-semibold text-white">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-lg font-semibold text-white">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-700 text-center md:text-left">
            <p>&copy; 2025 ExpenseTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
