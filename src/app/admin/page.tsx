'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';
import { Product } from '@/types';
import { championships, nationalTeams } from '@/data/categories';
import { 
  PlusCircle, 
  Settings, 
  Package, 
  Trash2, 
  Edit3, 
  Search, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Image as ImageIcon, 
  LogOut, 
  Save, 
  X, 
  Download, 
  Upload, 
  RotateCcw,
  Eye,
  MessageSquare
} from 'lucide-react';

const ALL_SIZES = ['P', 'M', 'G', 'GG', 'XG', '2XG', 'Infantil'];

const PRESET_SAMPLE_IMAGES = [
  { label: 'Camisa Vermelha / Preta', url: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Camisa Branca / Escura', url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80' },
  { label: 'Camisa Verde Esmeralda', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Camisa Vermelho Vivo', url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80' },
  { label: 'Camisa Azul Celeste', url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80' },
  { label: 'Camisa Amarela Canarinho', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80' },
];

export default function AdminDashboardPage() {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetToDefaultProducts, 
    isAdmin, 
    logout, 
    storeConfig, 
    updateStoreConfig 
  } = useStore();

  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'products' | 'new_product' | 'settings'>('products');
  const [filterSearch, setFilterSearch] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form states for New / Edit Product
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [category, setCategory] = useState<'championship' | 'national'>('championship');
  const [subcategory, setSubcategory] = useState('brasileirao');
  const [type, setType] = useState<'home' | 'away' | 'third' | 'special'>('home');
  const [season, setSeason] = useState('2025/26');
  const [price, setPrice] = useState('159.90');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState<string[]>(['P', 'M', 'G', 'GG', 'XG']);
  const [imageUrl, setImageUrl] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [hasPatchOption, setHasPatchOption] = useState(true);
  const [patchPrice, setPatchPrice] = useState('15.00');
  const [hasCustomizationOption, setHasCustomizationOption] = useState(true);
  const [customizationPrice, setCustomizationPrice] = useState('20.00');

  // Store settings form
  const [configStoreName, setConfigStoreName] = useState(storeConfig.storeName);
  const [configWhatsapp, setConfigWhatsapp] = useState(storeConfig.whatsappNumber);
  const [configInstagram, setConfigInstagram] = useState(storeConfig.instagram || '');
  const [configBanner, setConfigBanner] = useState(storeConfig.bannerText);
  const [configPixKey, setConfigPixKey] = useState(storeConfig.pixKey || '');

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Acesso Restrito</h1>
        <p className="text-sm text-slate-500 mb-6">
          Você precisa estar autenticado como administrador para acessar este painel.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          Fazer Login no Painel
        </Link>
      </div>
    );
  }

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleToggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      setImageList((prev) => [...prev, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleRemoveImageUrl = (index: number) => {
    setImageList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetPresetImage = (url: string) => {
    if (!imageList.includes(url)) {
      setImageList((prev) => [...prev, url]);
    }
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setName('');
    setTeam('');
    setCategory('championship');
    setSubcategory('brasileirao');
    setType('home');
    setSeason('2025/26');
    setPrice('159.90');
    setOriginalPrice('');
    setDescription('');
    setSizes(['P', 'M', 'G', 'GG', 'XG']);
    setImageUrl('');
    setImageList([]);
    setInStock(true);
    setFeatured(false);
    setIsNew(true);
    setHasPatchOption(true);
    setPatchPrice('15.00');
    setHasCustomizationOption(true);
    setCustomizationPrice('20.00');
  };

  const startEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setName(prod.name);
    setTeam(prod.team);
    setCategory(prod.category);
    setSubcategory(prod.subcategory);
    setType(prod.type);
    setSeason(prod.season);
    setPrice(prod.price.toString());
    setOriginalPrice(prod.originalPrice ? prod.originalPrice.toString() : '');
    setDescription(prod.description || '');
    setSizes(prod.sizes || ['P', 'M', 'G', 'GG']);
    setImageList(prod.images || []);
    setInStock(prod.inStock);
    setFeatured(prod.featured);
    setIsNew(prod.isNew);
    setHasPatchOption(prod.hasPatchOption ?? true);
    setPatchPrice((prod.patchPrice ?? 15).toString());
    setHasCustomizationOption(prod.hasCustomizationOption ?? true);
    setCustomizationPrice((prod.customizationPrice ?? 20).toString());
    setActiveTab('new_product');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !team.trim()) {
      alert('Por favor, informe o nome da camisa e o time!');
      return;
    }

    const parsedPrice = parseFloat(price.replace(',', '.')) || 0;
    const parsedOriginalPrice = originalPrice.trim()
      ? parseFloat(originalPrice.replace(',', '.'))
      : undefined;

    const productPayload = {
      name: name.trim(),
      team: team.trim(),
      category,
      subcategory,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      description: description.trim() || `Camisa oficial ${team} temporada ${season}. Confeccionada com materiais de alta qualidade e respirabilidade.`,
      images: imageList.length > 0 ? imageList : (imageUrl.trim() ? [imageUrl.trim()] : []),
      sizes: sizes.length > 0 ? sizes : ['P', 'M', 'G', 'GG'],
      type,
      season,
      inStock,
      featured,
      isNew,
      hasPatchOption,
      patchPrice: parseFloat(patchPrice) || 15,
      hasCustomizationOption,
      customizationPrice: parseFloat(customizationPrice) || 20,
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
      showNotification('✅ Camisa atualizada com sucesso!');
    } else {
      addProduct(productPayload);
      showNotification('✅ Nova camisa cadastrada com sucesso!');
    }

    resetProductForm();
    setActiveTab('products');
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreConfig({
      storeName: configStoreName,
      whatsappNumber: configWhatsapp,
      instagram: configInstagram,
      bannerText: configBanner,
      pixKey: configPixKey,
    });
    showNotification('✅ Configurações da loja salvas com sucesso!');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `catalogo-jopi-sport-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter products in table
  const filteredProducts = products.filter((p) => {
    const q = filterSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.team.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <span>🛡️</span> Modo Administrador Ativo
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Painel de Gestão da Loja
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cadastre nomes, valores, imagens e personalize o WhatsApp da Jopi Sport
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Eye size={15} /> Ver Loja
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <LogOut size={15} /> Sair
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <Check size={18} className="text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 mt-6 gap-2 sm:gap-4 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('products');
            resetProductForm();
          }}
          className={`pb-3 px-4 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package size={17} />
          <span>Gerenciar Camisas ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('new_product')}
          className={`pb-3 px-4 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'new_product'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <PlusCircle size={17} />
          <span>{editingProductId ? 'Editar Camisa' : 'Cadastrar Nova Camisa'}</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings size={17} />
          <span>Configurações &amp; WhatsApp</span>
        </button>
      </div>

      {/* TAB 1: PRODUCT LIST & STATS */}
      {activeTab === 'products' && (
        <div className="mt-8 space-y-6">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-bold uppercase">Total Cadastrado</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{products.length} camisas</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-bold uppercase">Em Estoque</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {products.filter((p) => p.inStock).length} unidades
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-bold uppercase">Destaques Home</span>
              <div className="text-2xl font-black text-yellow-600 mt-1">
                {products.filter((p) => p.featured).length} camisas
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-bold uppercase">Preço Médio</span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                R${' '}
                {(
                  products.reduce((acc, p) => acc + p.price, 0) / (products.length || 1)
                ).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Search and Action Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Filtrar por nome, time ou liga..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <button
              onClick={() => {
                resetProductForm();
                setActiveTab('new_product');
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition"
            >
              <PlusCircle size={16} />
              <span>Cadastrar Camisa</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-black text-[11px]">
                    <th className="p-4">Camisa / Time</th>
                    <th className="p-4">Categoria</th>
                    <th className="p-4">Preço</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Destaque</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                            {prod.images && prod.images.length > 0 ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl">👕</span>
                            )}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900">{prod.name}</div>
                            <div className="text-xs text-slate-400">
                              {prod.team} • {prod.season} • {prod.type}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="capitalize bg-slate-100 text-slate-700 px-2 py-1 rounded font-semibold text-xs">
                          {prod.subcategory}
                        </span>
                      </td>

                      <td className="p-4 font-black text-slate-900">
                        R$ {prod.price.toFixed(2)}
                        {prod.originalPrice && (
                          <div className="text-[10px] text-slate-400 line-through">
                            R$ {prod.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                          className={`text-xs px-2.5 py-1 rounded-full font-bold transition ${
                            prod.inStock
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          }`}
                        >
                          {prod.inStock ? 'Em estoque' : 'Esgotado'}
                        </button>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => updateProduct(prod.id, { featured: !prod.featured })}
                          className={`text-xs px-2.5 py-1 rounded-full font-bold transition ${
                            prod.featured
                              ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {prod.featured ? '★ Destaque' : 'Normal'}
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/produto/${prod.id}`}
                            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                            title="Visualizar produto na loja"
                          >
                            <Eye size={16} />
                          </Link>
                          <button
                            onClick={() => startEditProduct(prod)}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                            title="Editar camisa"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Tem certeza que deseja excluir "${prod.name}"?`)) {
                                deleteProduct(prod.id);
                                showNotification('🗑️ Camisa excluída!');
                              }
                            }}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            title="Excluir camisa"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Package size={36} className="mx-auto mb-2 opacity-50" />
                <p>Nenhuma camisa encontrada com os termos buscados.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: REGISTER / EDIT FORM */}
      {activeTab === 'new_product' && (
        <div className="mt-8">
          <form onSubmit={handleSaveProduct} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {editingProductId ? '✏️ Editar Camisa' : '✨ Cadastrar Nova Camisa'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Preencha os campos para disponibilizar o manto para venda via WhatsApp
                </p>
              </div>

              {editingProductId && (
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <X size={14} /> Cancelar Edição
                </button>
              )}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nome da Camisa:*
                </label>
                <input
                  type="text"
                  placeholder="Ex: Camisa Real Madrid Titular 2025/26"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Time / Clube / Seleção:*
                </label>
                <input
                  type="text"
                  placeholder="Ex: Real Madrid"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Categoria Principal:
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    const cat = e.target.value as 'championship' | 'national';
                    setCategory(cat);
                    setSubcategory(cat === 'championship' ? 'brasileirao' : 'brasil');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="championship">🏆 Campeonatos / Clubes</option>
                  <option value="national">🌍 Seleções Mundiais</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Campeonato ou País:*
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  {category === 'championship' ? (
                    championships.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.icon} {c.name}
                      </option>
                    ))
                  ) : (
                    nationalTeams.map((n) => (
                      <option key={n.slug} value={n.slug}>
                        {n.icon} {n.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Tipo de Uniforme:
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="home">Titular (I)</option>
                  <option value="away">Reserva (II)</option>
                  <option value="third">Terceiro Kit (III)</option>
                  <option value="special">Edição Especial / Retrô</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Temporada:
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2025/26"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Preço de Venda (R$):*
                </label>
                <input
                  type="text"
                  placeholder="159.90"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-slate-800 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Preço Original / De (R$) - Para desconto:
                </label>
                <input
                  type="text"
                  placeholder="Ex: 219.90 (opcional)"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Sizes Checkboxes */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Tamanhos Disponíveis para essa camisa:
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => handleToggleSize(sz)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition ${
                      sizes.includes(sz)
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {sz} {sizes.includes(sz) ? '✓' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Photos & Images Upload / Links */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Fotos / Imagens da Camisa:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Cole o link (URL) da foto (ex: https://...)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Adicionar Imagem
                  </button>
                </div>
              </div>

              {/* Preset demo pictures buttons */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                  Ou escolha uma foto de exemplo em alta definição:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_SAMPLE_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSetPresetImage(preset.url)}
                      className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg border border-slate-200 font-medium transition"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Previews */}
              {imageList.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
                  {imageList.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Camisa ${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImageUrl(i)}
                        className="absolute top-1 right-1 bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Descrição do Manto (Detalhes de tecido, acabamento, escudo):
              </label>
              <textarea
                rows={3}
                placeholder="Descreva a qualidade, detalhes do escudo bordado e tecnologia de respiração..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Toggles (Stock, Featured, Customization, Patch) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer border border-slate-200">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Em Estoque</div>
                  <div className="text-[10px] text-slate-500">Pronta entrega imediata</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer border border-slate-200">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Destaque na Home</div>
                  <div className="text-[10px] text-slate-500">Aparece na tela inicial</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer border border-slate-200">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Selo Lançamento</div>
                  <div className="text-[10px] text-slate-500">Coleção 2025/26</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer border border-slate-200">
                <input
                  type="checkbox"
                  checked={hasCustomizationOption}
                  onChange={(e) => setHasCustomizationOption(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Personalizar Nome/Nº</div>
                  <div className="text-[10px] text-slate-500">+R$ {customizationPrice}</div>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  resetProductForm();
                  setActiveTab('products');
                }}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition"
              >
                <Save size={17} />
                <span>{editingProductId ? 'Salvar Alterações' : 'Salvar e Publicar Camisa'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: STORE CONFIG & WHATSAPP SETTINGS */}
      {activeTab === 'settings' && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8">
            <form onSubmit={handleSaveConfig} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900">
                  ⚙️ Configurações Gerais &amp; WhatsApp
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure o número de WhatsApp para onde os pedidos dos clientes serão enviados
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nome da Loja:
                  </label>
                  <input
                    type="text"
                    value={configStoreName}
                    onChange={(e) => setConfigStoreName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Número do WhatsApp para Vendas (com DDI e DDD):*
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 5511999999999"
                    value={configWhatsapp}
                    onChange={(e) => setConfigWhatsapp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-emerald-700 focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    * Importante: Coloque apenas números com o código do país 55 e DDD (Ex: 5511999999999 para SP).
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Instagram da Loja:
                  </label>
                  <input
                    type="text"
                    placeholder="@jopisport"
                    value={configInstagram}
                    onChange={(e) => setConfigInstagram(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Texto do Banner Promocional do Topo:
                  </label>
                  <input
                    type="text"
                    value={configBanner}
                    onChange={(e) => setConfigBanner(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Chave Pix para Pagamento:
                  </label>
                  <input
                    type="text"
                    placeholder="Chave Pix (CPF, CNPJ, E-mail ou Telefone)"
                    value={configPixKey}
                    onChange={(e) => setConfigPixKey(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm flex items-center gap-2 shadow-lg transition"
                >
                  <Save size={17} />
                  <span>Salvar Configurações</span>
                </button>
              </div>
            </form>
          </div>

          {/* Backup & Catalog Reset Area */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-black text-base text-slate-900 pb-2 border-b border-slate-100">
                📦 Backup &amp; Dados
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                Exporte todo o seu catálogo para um arquivo JSON para backup ou restaure para os produtos padrão.
              </p>

              <button
                type="button"
                onClick={handleExportJSON}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Download size={15} />
                <span>Exportar Catálogo (JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Deseja restaurar as camisas originais de demonstração? Isso substituirá suas modificações.')) {
                    resetToDefaultProducts();
                    showNotification('🔄 Catálogo restaurado para os produtos padrão!');
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <RotateCcw size={15} />
                <span>Restaurar Catálogo Padrão</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
