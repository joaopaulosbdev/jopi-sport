'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, StoreConfig } from '@/types';
import { sampleProducts } from '@/data/sample-products';

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
  login: (password: string) => boolean;
  logout: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaultProducts: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_CONFIG: StoreConfig = {
  storeName: 'Jopi Sport Shop',
  whatsappNumber: '5511999999999',
  instagram: '@jopisportshop',
  bannerText: '⚡ FRETE GRÁTIS A PARTIR DE 2 CAMISAS • COMPRE DIRETO NO WHATSAPP • PARCELE NO PIX OU CARTÃO',
  pixKey: 'pix@jopisportshop.com.br',
  addressNotice: 'Enviamos para todo o Brasil com código de rastreamento Correios',
};

const ADMIN_PASSWORD = 'admin'; // Easy default password for admin access

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(DEFAULT_CONFIG);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('jopi_products');
      const savedConfig = localStorage.getItem('jopi_config');
      const savedCart = localStorage.getItem('jopi_cart');
      const savedAdmin = localStorage.getItem('jopi_admin_logged');

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

      if (savedConfig) {
        setStoreConfig({ ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) });
      }

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      if (savedAdmin === 'true') {
        setIsAdmin(true);
      }
    } catch (err) {
      console.error('Error loading data from localStorage', err);
      setProducts(sampleProducts);
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

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD || password === 'jopi2025' || password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('jopi_admin_logged', 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    localStorage.removeItem('jopi_admin_logged');
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

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
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
        login,
        logout,
        searchQuery,
        setSearchQuery,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaultProducts,
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
