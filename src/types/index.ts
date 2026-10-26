export interface Product {
  id: string;
  name: string;
  team: string;
  category: 'championship' | 'national';
  subcategory: string; // e.g., "brasileirao", "premier-league", "brasil", etc.
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  type: 'home' | 'away' | 'third' | 'special';
  season: string;
  version: 'torcedor' | 'jogador';
  isReadyDelivery: boolean; // Pronta entrega (true) vs Sob encomenda (false)
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  hasPatchOption?: boolean;
  patchPrice?: number;
  hasCustomizationOption?: boolean;
  customizationPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  imageUrl?: string; // Link da imagem/logo do campeonato ou bandeira do país
  type: 'championship' | 'national';
  country?: string;
  continent?: string;
  description?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
  customName?: string;
  customNumber?: string;
  includePatch?: boolean;
  unitPrice: number;
}

export interface StoreConfig {
  storeName: string;
  whatsappNumber: string;
  instagram?: string;
  bannerText: string;
  logo?: string;
  pixKey?: string;
  addressNotice?: string;
}
