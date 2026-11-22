'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, StoreConfig, Category, AdminUser } from '@/types';
import { sampleProducts } from '@/data/sample-products';
import { initialCategories } from '@/data/categories';
import { signOutFirebase } from '@/lib/firebase';

interface AddToCartParams {
  product: Product;
  size: string;
  quantity?: number;
  customName?: string;
  customNumber?: string;
  includePatch?: boolean;
}

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  cart: CartItem[];
  addToCart: (params: AddToCartParams) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  storeConfig: StoreConfig;
  updateStoreConfig: (newConfig: Partial<StoreConfig>) => void;
  isAdmin: boolean;
  adminUser: AdminUser | null;
  login: (password: string) => boolean;
  loginWithGoogle: (user: AdminUser) => { success: boolean; error?: string };
  logout: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaultProducts: () => void;
  addCategory: (cat: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, cat: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  resetToDefaultCategories: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_CONFIG: StoreConfig = {
  storeName: 'Jopi Sport Shop',
  whatsappNumber: '5511999999999',
  instagram: '@jopisportshop',
  bannerText: 'FRETE GRÁTIS A PARTIR DE 2 CAMISAS • COMPRE DIRETO NO WHATSAPP • PARCELE NO PIX OU CARTÃO',
  pixKey: 'pix@jopisportshop.com.br',
  addressNotice: 'Enviamos para todo o Brasil com código de rastreamento Correios',
  authorizedAdminEmails: process.env.NEXT_PUBLIC_AUTHORIZED_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_AUTHORIZED_ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
    : [],
};


export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(DEFAULT_CONFIG);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('jopi_products');
      const savedCategories = localStorage.getItem('jopi_categories');
      const savedConfig = localStorage.getItem('jopi_config');
      const savedCart = localStorage.getItem('jopi_cart');
      const savedAdmin = localStorage.getItem('jopi_admin_logged');
      const savedAdminUser = localStorage.getItem('jopi_admin_user');

      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        } else {
          setProducts(sampleProducts);
        }
      } else {
        setProducts(sampleProducts);
        localStorage.setItem('jopi_products', JSON.stringify(sampleProducts));
      }

      if (savedCategories) {
        const parsedCats = JSON.parse(savedCategories);
        if (Array.isArray(parsedCats) && parsedCats.length > 0) {
          setCategories(parsedCats);
        } else {
          setCategories(initialCategories);
        }
      } else {
        setCategories(initialCategories);
        localStorage.setItem('jopi_categories', JSON.stringify(initialCategories));
      }

      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        const envEmails = process.env.NEXT_PUBLIC_AUTHORIZED_ADMIN_EMAILS
          ? process.env.NEXT_PUBLIC_AUTHORIZED_ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
          : [];
        const mergedEmails = Array.from(new Set([
          ...(parsed.authorizedAdminEmails || []),
          ...envEmails,
        ]));
        setStoreConfig({
          ...DEFAULT_CONFIG,
          ...parsed,
          authorizedAdminEmails: mergedEmails,
        });
      }

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      if (savedAdmin === 'true') {
        setIsAdmin(true);
        if (savedAdminUser) {
          try {
            setAdminUser(JSON.parse(savedAdminUser));
          } catch {
            setAdminUser({
              email: 'admin@jopisportshop.com.br',
              name: 'Administrador',
              loginMethod: 'password',
            });
          }
        }
      }
    } catch (err) {
      console.error('Error loading data from localStorage', err);
      setProducts(sampleProducts);
      setCategories(initialCategories);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync products changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('jopi_products', JSON.stringify(products));
    } catch (err) {
      console.error('Error saving products', err);
    }
  }, [products, isLoaded]);

  // Sync categories changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('jopi_categories', JSON.stringify(categories));
    } catch (err) {
      console.error('Error saving categories', err);
    }
  }, [categories, isLoaded]);

  // Sync config
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('jopi_config', JSON.stringify(storeConfig));
    } catch (err) {
      console.error('Error saving config', err);
    }
  }, [storeConfig, isLoaded]);

  // Sync cart
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('jopi_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error saving cart', err);
    }
  }, [cart, isLoaded]);

  const addToCart = useCallback((params: AddToCartParams) => {
    const {
      product,
      size,
      quantity = 1,
      customName = '',
      customNumber = '',
      includePatch = false,
    } = params;

    let unitPrice = product.price;
    if (customName.trim() || customNumber.trim()) {
      unitPrice += product.customizationPrice || 20;
    }
    if (includePatch) {
      unitPrice += product.patchPrice || 15;
    }

    const uniqueId = `${product.id}-${size}-${customName}-${customNumber}-${includePatch ? 'patch' : 'nopatch'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === uniqueId);
      if (existing) {
        return prev.map(item =>
          item.id === uniqueId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: uniqueId,
          product,
          size,
          quantity,
          customName: customName.trim() || undefined,
          customNumber: customNumber.trim() || undefined,
          includePatch,
          unitPrice,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const updateStoreConfig = useCallback((newConfig: Partial<StoreConfig>) => {
    setStoreConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const loginWithGoogle = useCallback((user: AdminUser) => {
    const userEmailLower = user.email.toLowerCase().trim();
    const envEmails = (process.env.NEXT_PUBLIC_AUTHORIZED_ADMIN_EMAILS || '')
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);
    const configuredEmails = (storeConfig.authorizedAdminEmails || [])
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);

    const authorized = Array.from(new Set([...envEmails, ...configuredEmails]));

    if (authorized.length > 0) {
      const isAuthorized = authorized.some(authEmail => authEmail === userEmailLower);
      if (!isAuthorized) {
        return {
          success: false,
          error: `O e-mail "${user.email}" não está na lista de administradores autorizados.`,
        };
      }
    }

    const completeUser: AdminUser = {
      ...user,
      loginMethod: 'google',
      loggedInAt: new Date().toISOString(),
    };

    setIsAdmin(true);
    setAdminUser(completeUser);
    localStorage.setItem('jopi_admin_logged', 'true');
    localStorage.setItem('jopi_admin_user', JSON.stringify(completeUser));

    return { success: true };
  }, [storeConfig.authorizedAdminEmails]);

  const login = useCallback((_password: string) => {
    // Modo de login por senha desativado por seguranca - utilize login Google
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem('jopi_admin_logged');
    localStorage.removeItem('jopi_admin_user');
    signOutFirebase();
  }, []);

  const addProduct = useCallback(
    (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newProduct: Product = {
        ...productData,
        id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    },
    []
  );

  const updateProduct = useCallback((id: string, updatedFields: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, ...updatedFields, updatedAt: new Date().toISOString() }
          : p
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const resetToDefaultProducts = useCallback(() => {
    setProducts(sampleProducts);
    localStorage.setItem('jopi_products', JSON.stringify(sampleProducts));
  }, []);

  const addCategory = useCallback((catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: catData.slug.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  }, []);

  const updateCategory = useCallback((id: string, updatedFields: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  const resetToDefaultCategories = useCallback(() => {
    setCategories(initialCategories);
    localStorage.setItem('jopi_categories', JSON.stringify(initialCategories));
  }, []);

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        storeConfig,
        updateStoreConfig,
        isAdmin,
        adminUser,
        login,
        loginWithGoogle,
        logout,
        searchQuery,
        setSearchQuery,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaultProducts,
        addCategory,
        updateCategory,
        deleteCategory,
        resetToDefaultCategories,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
