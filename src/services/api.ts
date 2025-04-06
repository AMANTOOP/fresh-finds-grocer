
import { Product, Store, Category, User } from "../types";
import { products as mockProducts, stores as mockStores, categories as mockCategories } from "./mockData";

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Product APIs
export const getProducts = async (storeId?: string): Promise<Product[]> => {
  await delay(500);
  if (storeId) {
    return mockProducts.filter(product => product.storeId === storeId);
  }
  return [...mockProducts];
};

export const getProduct = async (productId: string): Promise<Product | undefined> => {
  await delay(300);
  return mockProducts.find(product => product.id === productId);
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  await delay(700);
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // In a real app, we'd POST to an API
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (productId: string, updates: Partial<Product>): Promise<Product> => {
  await delay(500);
  const index = mockProducts.findIndex(p => p.id === productId);
  if (index === -1) throw new Error("Product not found");
  
  mockProducts[index] = {
    ...mockProducts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return mockProducts[index];
};

export const deleteProduct = async (productId: string): Promise<boolean> => {
  await delay(600);
  const index = mockProducts.findIndex(p => p.id === productId);
  if (index === -1) return false;
  
  mockProducts.splice(index, 1);
  return true;
};

// Store APIs
export const getStores = async (): Promise<Store[]> => {
  await delay(400);
  return [...mockStores];
};

export const getStore = async (storeId: string): Promise<Store | undefined> => {
  await delay(300);
  return mockStores.find(store => store.id === storeId);
};

export const createStore = async (store: Omit<Store, 'id'>): Promise<Store> => {
  await delay(600);
  const newStore: Store = {
    ...store,
    id: Date.now().toString()
  };
  
  mockStores.push(newStore);
  return newStore;
};

// Category APIs
export const getCategories = async (): Promise<Category[]> => {
  await delay(300);
  return [...mockCategories];
};
