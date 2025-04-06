
import { Product, Store, Category } from '../types';

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Fruits',
    nameTranslations: { en: 'Fruits', te: 'పండ్లు' }
  },
  {
    id: '2',
    name: 'Vegetables',
    nameTranslations: { en: 'Vegetables', te: 'కూరగాయలు' }
  },
  {
    id: '3',
    name: 'Dairy',
    nameTranslations: { en: 'Dairy', te: 'పాల ఉత్పత్తులు' }
  },
  {
    id: '4',
    name: 'Grains',
    nameTranslations: { en: 'Grains', te: 'ధాన్యాలు' }
  }
];

// Mock Stores
export const stores: Store[] = [
  {
    id: '1',
    name: 'Fresh Market',
    location: 'Hyderabad',
    ownerId: '1',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Organic Bazaar',
    location: 'Warangal',
    ownerId: '2',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'City Grocers',
    location: 'Vijayawada',
    ownerId: '3',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a47a?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Apple',
    nameTranslations: { en: 'Apple', te: 'యాపిల్' },
    category: 'Fruits',
    categoryTranslations: { en: 'Fruits', te: 'పండ్లు' },
    price: 25,
    quantity: 100,
    unit: 'kg',
    unitTranslations: { en: 'kg', te: 'కిలో' },
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1000&auto=format&fit=crop',
    storeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Banana',
    nameTranslations: { en: 'Banana', te: 'అరటిపండు' },
    category: 'Fruits',
    categoryTranslations: { en: 'Fruits', te: 'పండ్లు' },
    price: 40,
    quantity: 150,
    unit: 'dozen',
    unitTranslations: { en: 'dozen', te: 'డజన్' },
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000&auto=format&fit=crop',
    storeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Tomato',
    nameTranslations: { en: 'Tomato', te: 'టమాటా' },
    category: 'Vegetables',
    categoryTranslations: { en: 'Vegetables', te: 'కూరగాయలు' },
    price: 30,
    quantity: 80,
    unit: 'kg',
    unitTranslations: { en: 'kg', te: 'కిలో' },
    image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?q=80&w=1000&auto=format&fit=crop',
    storeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Potato',
    nameTranslations: { en: 'Potato', te: 'బంగాళదుంప' },
    category: 'Vegetables',
    categoryTranslations: { en: 'Vegetables', te: 'కూరగాయలు' },
    price: 20,
    quantity: 200,
    unit: 'kg',
    unitTranslations: { en: 'kg', te: 'కిలో' },
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1000&auto=format&fit=crop',
    storeId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Milk',
    nameTranslations: { en: 'Milk', te: 'పాలు' },
    category: 'Dairy',
    categoryTranslations: { en: 'Dairy', te: 'పాల ఉత్పత్తులు' },
    price: 50,
    quantity: 30,
    unit: 'liter',
    unitTranslations: { en: 'liter', te: 'లీటర్' },
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1000&auto=format&fit=crop',
    storeId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Rice',
    nameTranslations: { en: 'Rice', te: 'బియ్యం' },
    category: 'Grains',
    categoryTranslations: { en: 'Grains', te: 'ధాన్యాలు' },
    price: 60,
    quantity: 50,
    unit: 'kg',
    unitTranslations: { en: 'kg', te: 'కిలో' },
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop',
    storeId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Onion',
    nameTranslations: { en: 'Onion', te: 'ఉల్లిపాయ' },
    category: 'Vegetables',
    categoryTranslations: { en: 'Vegetables', te: 'కూరగాయలు' },
    price: 35,
    quantity: 120,
    unit: 'kg',
    unitTranslations: { en: 'kg', te: 'కిలో' },
    image: 'https://images.unsplash.com/photo-1618512496248-a4b08aaf1b77?q=80&w=1000&auto=format&fit=crop',
    storeId: '3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
