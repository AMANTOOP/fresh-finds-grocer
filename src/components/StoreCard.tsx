
import React from 'react';
import { Store } from '../types';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Link to={`/stores/${store.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 product-card-animation">
        <div className="relative h-48 overflow-hidden">
          {store.image ? (
            <img 
              src={store.image} 
              alt={store.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">{store.name}</h3>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{store.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
