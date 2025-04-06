
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold">{translate('app.title')}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary">
            {translate('nav.home')}
          </Link>
          <Link to="/stores" className="text-gray-700 hover:text-primary">
            {translate('nav.stores')}
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-primary">
            {translate('nav.products')}
          </Link>
          
          <LanguageToggle />

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {user?.role === 'admin' && (
                <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                  {translate('nav.dashboard')}
                </Link>
              )}
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-600 mr-2" />
                <span>{user?.name}</span>
              </div>
              <Button variant="outline" onClick={logout}>
                {translate('nav.logout')}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">{translate('nav.login')}</Button>
              </Link>
              <Link to="/register">
                <Button>{translate('nav.register')}</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-gray-700"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4">
          <nav className="flex flex-col space-y-3 px-6">
            <Link to="/" className="text-gray-700 hover:text-primary py-2">
              {translate('nav.home')}
            </Link>
            <Link to="/stores" className="text-gray-700 hover:text-primary py-2">
              {translate('nav.stores')}
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary py-2">
              {translate('nav.products')}
            </Link>
            
            <div className="py-2">
              <LanguageToggle />
            </div>

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary py-2">
                    {translate('nav.dashboard')}
                  </Link>
                )}
                <div className="flex items-center py-2">
                  <UserIcon className="h-5 w-5 text-gray-600 mr-2" />
                  <span>{user?.name}</span>
                </div>
                <Button variant="outline" className="w-full" onClick={logout}>
                  {translate('nav.logout')}
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 py-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    {translate('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">
                    {translate('nav.register')}
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
