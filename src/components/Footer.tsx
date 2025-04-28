
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; 2025 ExpenseTracker. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
