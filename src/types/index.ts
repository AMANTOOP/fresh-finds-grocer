
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  storeId?: string;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  ownerId: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  category: string;
  categoryTranslations?: Record<string, string>;
  price: number;
  quantity: number;
  unit: string;
  unitTranslations?: Record<string, string>;
  image?: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
}

export type Language = "en" | "te";

export interface LanguageOption {
  id: string;
  name: string;
  nativeName: string;
}
