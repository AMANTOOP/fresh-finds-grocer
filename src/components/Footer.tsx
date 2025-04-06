
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart } from 'lucide-react';

const Footer = () => {
  const { translate } = useLanguage();
  
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <ShoppingCart className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">{translate('app.title')}</span>
            </div>
            <p className="text-gray-300">
              {translate('app.tagline')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/stores" className="text-gray-300 hover:text-white">Stores</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-white">Products</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-gray-300">Email: info@smartstock.com</p>
            <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© 2025 SmartStock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
