
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Language, LanguageOption } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  translate: (key: string, translations?: Record<string, string>) => string;
  availableLanguages: LanguageOption[];
}

const languageOptions: LanguageOption[] = [
  { id: 'en', name: 'English', nativeName: 'English' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
];

const translations = {
  en: {
    "app.title": "SmartStock",
    "app.tagline": "Real-time grocery inventory management",
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.stores": "Stores",
    "nav.dashboard": "Dashboard",
    "nav.inventory": "Inventory",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    "products.search": "Search products...",
    "products.filter": "Filter",
    "products.sort": "Sort By",
    "products.noResults": "No products found",
    "products.category": "Category",
    "products.price": "Price",
    "products.quantity": "Quantity",
    "products.unit": "Unit",
    "products.actions": "Actions",
    "products.add": "Add Product",
    "products.edit": "Edit",
    "products.delete": "Delete",
    "stores.search": "Search stores...",
    "stores.noResults": "No stores found",
    "forms.name": "Name",
    "forms.email": "Email",
    "forms.password": "Password",
    "forms.confirmPassword": "Confirm Password",
    "forms.role": "Role",
    "forms.submit": "Submit",
    "forms.cancel": "Cancel",
    "forms.location": "Location",
    "forms.category": "Category",
    "forms.price": "Price",
    "forms.quantity": "Quantity",
    "forms.unit": "Unit",
    "forms.image": "Image",
    "login.title": "Login",
    "login.noAccount": "Don't have an account?",
    "login.register": "Register here",
    "register.title": "Register",
    "register.hasAccount": "Already have an account?",
    "register.login": "Login here",
    "dashboard.welcome": "Welcome",
    "dashboard.totalProducts": "Total Products",
    "dashboard.lowStock": "Low Stock Items",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.revenue": "Revenue"
  },
  te: {
    "app.title": "స్మార్ట్ స్టాక్",
    "app.tagline": "రియల్-టైమ్ కిరాణా ఇన్వెంటరీ మేనేజ్మెంట్",
    "nav.home": "హోమ్",
    "nav.products": "ఉత్పత్తులు",
    "nav.stores": "స్టోర్స్",
    "nav.dashboard": "డాష్బోర్డ్",
    "nav.inventory": "ఇన్వెంటరీ",
    "nav.login": "లాగిన్",
    "nav.register": "రిజిస్టర్",
    "nav.logout": "లాగ్అవుట్",
    "products.search": "ఉత్పత్తులను శోధించండి...",
    "products.filter": "ఫిల్టర్",
    "products.sort": "క్రమంలో అమర్చు",
    "products.noResults": "ఉత్పత్తులు కనుగొనబడలేదు",
    "products.category": "వర్గం",
    "products.price": "ధర",
    "products.quantity": "పరిమాణం",
    "products.unit": "యూనిట్",
    "products.actions": "చర్యలు",
    "products.add": "ఉత్పత్తిని జోడించండి",
    "products.edit": "సవరించు",
    "products.delete": "తొలగించు",
    "stores.search": "స్టోర్స్ శోధించండి...",
    "stores.noResults": "స్టోర్స్ కనుగొనబడలేదు",
    "forms.name": "పేరు",
    "forms.email": "ఇమెయిల్",
    "forms.password": "పాస్‌వర్డ్",
    "forms.confirmPassword": "పాస్‌వర్డ్ నిర్ధారించండి",
    "forms.role": "పాత్ర",
    "forms.submit": "సమర్పించండి",
    "forms.cancel": "రద్దు",
    "forms.location": "స్థానం",
    "forms.category": "వర్గం",
    "forms.price": "ధర",
    "forms.quantity": "పరిమాణం",
    "forms.unit": "యూనిట్",
    "forms.image": "చిత్రం",
    "login.title": "లాగిన్",
    "login.noAccount": "ఖాతా లేదా?",
    "login.register": "ఇక్కడ నమోదు చేయండి",
    "register.title": "రిజిస్టర్",
    "register.hasAccount": "ఖాతా ఉందా?",
    "register.login": "ఇక్కడ లాగిన్ చేయండి",
    "dashboard.welcome": "స్వాగతం",
    "dashboard.totalProducts": "మొత్తం ఉత్పత్తులు",
    "dashboard.lowStock": "తక్కువ స్టాక్ ఉన్న వస్తువులు",
    "dashboard.recentActivity": "ఇటీవలి కార్యకలాపం",
    "dashboard.revenue": "ఆదాయం"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartstock_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'te')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('smartstock_language', lang);
  };

  const translate = (key: string, customTranslations?: Record<string, string>): string => {
    if (customTranslations && customTranslations[currentLanguage]) {
      return customTranslations[currentLanguage];
    }
    
    return translations[currentLanguage][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage,
      translate,
      availableLanguages: languageOptions
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
