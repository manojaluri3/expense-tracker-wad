
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-primary">
              ExpenseTracker
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                Dashboard
              </Link>
              <Link to="#" className="text-gray-700 hover:text-primary">
                Reports
              </Link>
              <Link to="#" className="text-gray-700 hover:text-primary">
                Settings
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-sm text-gray-600 hidden md:block">
                Welcome, <span className="font-medium">{user.username}</span>
              </div>
            )}
            <Button 
              variant="ghost" 
              onClick={logout} 
              className="text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
