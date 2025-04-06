
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStores } from '@/services/api';
import { Store } from '@/types';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import StoreCard from '@/components/StoreCard';
import { useLanguage } from '@/contexts/LanguageContext';

const StoresPage = () => {
  const { translate } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: stores = [], isLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: getStores
  });
  
  const filteredStores = stores.filter((store: Store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{translate('nav.stores')}</h1>
      
      {/* Search */}
      <div className="max-w-md mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={translate('stores.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Store Locations Map (placeholder) */}
      <div className="mb-8 bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
          <p className="font-medium">Interactive map coming soon</p>
          <p className="text-sm text-gray-600">We're working on adding an interactive map to help you find stores near you.</p>
        </div>
      </div>
      
      {/* Stores Grid */}
      <h2 className="text-xl font-semibold mb-4">All Stores</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store: Store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">{translate('stores.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default StoresPage;
