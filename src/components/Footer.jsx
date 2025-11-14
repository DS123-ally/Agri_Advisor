/**
 * Footer Component
 * Footer with information and links
 */

import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-600'} py-8 mt-16`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-primary">About Us</h3>
            <p className="text-sm">
              Smart & Climate-Resilient Agriculture Advisor helps farmers make data-driven decisions
              for sustainable crop production.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-primary">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-primary">Contact</h3>
            <p className="text-sm">
              📧 Email: info@agriadvisor.com<br/>
              📱 Phone: +91-XXX-XXXX-XXXX<br/>
              📍 India
            </p>
          </div>
        </div>

        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 text-center text-sm`}>
          <p>&copy; 2025 AgriAdvisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
