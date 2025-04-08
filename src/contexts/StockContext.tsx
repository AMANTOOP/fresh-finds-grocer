// contexts/StockContext.tsx
import React, { createContext, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface StockContextType {
  getQuantity: (itemName: string) => Promise<number | null>;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getQuantity = async (itemName: string): Promise<number | null> => {
    try {
      const lowerItem = itemName.toLowerCase();
      const { data, error } = await supabase
        .from('stock')
        .select('quantity')
        .ilike('item', lowerItem);

      if (error) {
        console.error('Supabase fetch error:', error.message);
        return null;
      }

      const total = data?.reduce((sum, entry) => sum + Number(entry.quantity || 0), 0) || 0;
      return total;
    } catch (err: any) {
      console.error('Unexpected fetch error:', err.message);
      return null;
    }
  };

  return (
    <StockContext.Provider value={{ getQuantity }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) throw new Error('useStock must be used within StockProvider');
  return context;
};
