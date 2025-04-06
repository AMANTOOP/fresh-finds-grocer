
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStore, getProducts } from '@/services/api';
import { Store, Product } from '@/types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';

const StoreDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { translate } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const { data: store, isLoading: isStoreLoading } = useQuery({
    queryKey: ['store', id],
    queryFn: () => getStore(id as string),
    enabled: !!id
  });
  
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProducts(id),
    enabled: !!id
  });
  
  const filteredProducts = products.filter((product: Product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (isStoreLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-40 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!store) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Store not found</h1>
        <p>The store you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Store Header */}
      <div className="relative h-64 mb-8 rounded-lg overflow-hidden shadow-md">
        {store.image ? (
          <img 
            src={store.image} 
            alt={store.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex flex-col justify-end p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{store.name}</h1>
          <div className="flex items-center text-white">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{store.location}</span>
          </div>
        </div>
      </div>
      
      {/* Store Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <Phone className="h-8 w-8 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">+91 98765 43210</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <Mail className="h-8 w-8 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">contact@{store.name.toLowerCase().replace(/\s+/g, '')}.com</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <Clock className="h-8 w-8 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Hours</p>
            <p className="font-medium">7:00 AM - 9:00 PM</p>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Available Products</h2>
        
        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={translate('products.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Products Grid */}
        {isProductsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">{translate('products.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetailsPage;
