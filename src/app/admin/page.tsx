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
  LogOut, 
  Save, 
  X, 
  Download, 
  RotateCcw,
  Eye,
  Truck
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
      <div className="bg-[#F4F5F7] min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border-2 border-black p-8 text-center max-w-md w-full shadow-xl">
          <div className="w-16 h-16 bg-black text-[#FFD900] rounded-xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-xl font-black uppercase text-black mb-1">Acesso Restrito</h1>
          <p className="text-xs text-neutral-500 mb-6 font-medium">
            Você precisa estar autenticado como administrador para acessar o painel.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-[#FFD900] font-black text-xs uppercase hover:bg-neutral-800 transition"
          >
            Fazer Login no Painel
          </Link>
        </div>
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
    downloadAnchor.setAttribute('download', `catalogo-jopi-sport-shop-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredProducts = products.filter((p) => {
    const q = filterSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.team.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#F4F5F7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFD900] text-black px-3 py-0.5 rounded text-xs font-black uppercase mb-1">
              PAINEL ADMIN JOPI SPORT SHOP
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              Gestão da Loja &amp; Catálogo
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-black text-xs font-black uppercase flex items-center gap-1.5 transition"
            >
              <Eye size={15} /> Ver Loja
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-black text-[#FFD900] hover:bg-neutral-800 text-xs font-black uppercase flex items-center gap-1.5 transition"
            >
              <LogOut size={15} /> Sair
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="mt-4 p-4 bg-[#FFFBE6] border-2 border-[#FFD900] text-black text-xs font-black uppercase rounded-xl flex items-center gap-2">
            <Check size={18} className="text-black stroke-[3]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-neutral-300 mt-6 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('products');
              resetProductForm();
            }}
            className={`pb-3 px-4 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-black text-black'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <Package size={16} />
            <span>Gerenciar Camisas ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('new_product')}
            className={`pb-3 px-4 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'new_product'
                ? 'border-black text-black'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <PlusCircle size={16} />
            <span>{editingProductId ? 'Editar Camisa' : 'Cadastrar Nova Camisa'}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-4 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-black text-black'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <Settings size={16} />
            <span>Configurações &amp; WhatsApp</span>
          </button>
        </div>

        {/* Tab 1: Product List */}
        {activeTab === 'products' && (
          <div className="mt-6 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                <span className="text-[10px] text-neutral-500 font-black uppercase">Total de Camisas</span>
                <div className="text-2xl font-black text-black mt-1">{products.length}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                <span className="text-[10px] text-neutral-500 font-black uppercase">Em Estoque</span>
                <div className="text-2xl font-black text-[#008A3E] mt-1">
                  {products.filter((p) => p.inStock).length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                <span className="text-[10px] text-neutral-500 font-black uppercase">Destaques</span>
                <div className="text-2xl font-black text-black mt-1">
                  {products.filter((p) => p.featured).length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                <span className="text-[10px] text-neutral-500 font-black uppercase">Preço Médio</span>
                <div className="text-2xl font-black text-black mt-1">
                  R$ {(products.reduce((acc, p) => acc + p.price, 0) / (products.length || 1)).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Filter and Add */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Buscar camisa por nome, time ou liga..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-4 py-2 pl-10 text-xs text-black focus:outline-none focus:border-black"
                />
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              </div>

              <button
                onClick={() => {
                  resetProductForm();
                  setActiveTab('new_product');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#FFD900] hover:bg-[#E6C300] text-black font-black text-xs uppercase flex items-center justify-center gap-1.5 transition"
              >
                <PlusCircle size={15} />
                <span>CADASTRAR CAMISA</span>
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-neutral-100 border-b border-neutral-200 text-neutral-700 uppercase font-black text-[11px]">
                      <th className="p-3.5">Camisa</th>
                      <th className="p-3.5">Categoria</th>
                      <th className="p-3.5">Preço</th>
                      <th className="p-3.5">Estoque</th>
                      <th className="p-3.5">Destaque</th>
                      <th className="p-3.5 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-neutral-50 transition">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-[#F8F9FA] overflow-hidden shrink-0 border border-neutral-200 flex items-center justify-center">
                              {prod.images && prod.images.length > 0 ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-lg">👕</span>
                              )}
                            </div>
                            <div>
                              <div className="font-black text-black uppercase">{prod.name}</div>
                              <div className="text-[11px] text-neutral-500 font-medium">
                                {prod.team} • {prod.season}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="capitalize bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded font-bold text-[11px] border border-neutral-200">
                            {prod.subcategory}
                          </span>
                        </td>

                        <td className="p-3.5 font-black text-black">
                          R$ {prod.price.toFixed(2)}
                          {prod.originalPrice && (
                            <div className="text-[10px] text-neutral-400 line-through">
                              R$ {prod.originalPrice.toFixed(2)}
                            </div>
                          )}
                        </td>

                        <td className="p-3.5">
                          <button
                            onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded transition ${
                              prod.inStock
                                ? 'bg-[#E8F8EE] text-[#008A3E]'
                                : 'bg-neutral-200 text-neutral-600'
                            }`}
                          >
                            {prod.inStock ? 'Em estoque' : 'Esgotado'}
                          </button>
                        </td>

                        <td className="p-3.5">
                          <button
                            onClick={() => updateProduct(prod.id, { featured: !prod.featured })}
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded transition ${
                              prod.featured
                                ? 'bg-[#FFD900] text-black'
                                : 'bg-neutral-100 text-neutral-400'
                            }`}
                          >
                            {prod.featured ? '★ Destaque' : 'Normal'}
                          </button>
                        </td>

                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/produto/${prod.id}`}
                              className="p-1.5 rounded text-neutral-500 hover:text-black hover:bg-neutral-100 transition"
                              title="Ver na loja"
                            >
                              <Eye size={15} />
                            </Link>
                            <button
                              onClick={() => startEditProduct(prod)}
                              className="p-1.5 rounded text-black hover:bg-neutral-100 transition"
                              title="Editar"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Deseja excluir "${prod.name}"?`)) {
                                  deleteProduct(prod.id);
                                  showNotification('🗑️ Camisa excluída!');
                                }
                              }}
                              className="p-1.5 rounded text-red-600 hover:bg-red-50 transition"
                              title="Excluir"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: New / Edit Form */}
        {activeTab === 'new_product' && (
          <div className="mt-6">
            <form onSubmit={handleSaveProduct} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h2 className="text-base font-black uppercase text-black">
                  {editingProductId ? '✏️ Editar Manto' : '✨ Cadastrar Novo Manto'}
                </h2>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={resetProductForm}
                    className="text-xs font-bold text-neutral-500 hover:text-black flex items-center gap-1"
                  >
                    <X size={13} /> Cancelar
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Nome da Camisa:*
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Camisa Real Madrid Titular 2025/26"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs font-bold text-black focus:outline-none focus:border-black uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Time / Clube / Seleção:*
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Real Madrid"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs font-bold text-black focus:outline-none focus:border-black uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Categoria:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      setCategory(cat);
                      setSubcategory(cat === 'championship' ? 'brasileirao' : 'brasil');
                    }}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  >
                    <option value="championship">🏆 Campeonatos / Clubes</option>
                    <option value="national">🌍 Seleções Mundiais</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Liga ou País:*
                  </label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  >
                    {category === 'championship' ? (
                      championships.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))
                    ) : (
                      nationalTeams.map((n) => (
                        <option key={n.slug} value={n.slug}>{n.name}</option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Tipo de Camisa:
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  >
                    <option value="home">Titular (I)</option>
                    <option value="away">Reserva (II)</option>
                    <option value="third">3º Uniforme (III)</option>
                    <option value="special">Edição Especial / Retrô</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Preço de Venda (R$):*
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs font-black text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Preço Original (R$) - Para desconto:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 219.90 (opcional)"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Temporada:
                  </label>
                  <input
                    type="text"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1.5">
                  Tamanhos Disponíveis:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_SIZES.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleToggleSize(sz)}
                      className={`px-3 py-1 rounded-lg text-xs font-black border transition ${
                        sizes.includes(sz)
                          ? 'bg-black text-[#FFD900] border-black'
                          : 'bg-white text-neutral-700 border-neutral-300'
                      }`}
                    >
                      {sz} {sizes.includes(sz) ? '✓' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="space-y-3 pt-3 border-t border-neutral-100">
                <label className="text-[11px] font-black uppercase text-neutral-700 block">
                  Foto da Camisa (URL):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Cole o link da foto (ex: https://...)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2 bg-black text-[#FFD900] text-xs font-black uppercase rounded-lg hover:bg-neutral-800 transition"
                  >
                    Adicionar Imagem
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-neutral-500 font-bold block w-full mb-0.5">
                    Fotos de exemplo prontas:
                  </span>
                  {PRESET_SAMPLE_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSetPresetImage(preset.url)}
                      className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-black px-2 py-0.5 rounded border border-neutral-200 font-bold"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>

                {imageList.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
                    {imageList.map((url, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-300 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`Camisa ${i}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImageUrl(i)}
                          className="absolute top-1 right-1 bg-black text-[#FFD900] w-5 h-5 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-neutral-100">
                <label className="flex items-center gap-2 p-2.5 bg-[#F8F9FA] rounded-lg border border-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="rounded text-black"
                  />
                  <span className="text-xs font-bold text-black">Em Estoque</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-[#F8F9FA] rounded-lg border border-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-black"
                  />
                  <span className="text-xs font-bold text-black">Destaque na Home</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-[#F8F9FA] rounded-lg border border-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="rounded text-black"
                  />
                  <span className="text-xs font-bold text-black">Lançamento</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-[#F8F9FA] rounded-lg border border-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasCustomizationOption}
                    onChange={(e) => setHasCustomizationOption(e.target.checked)}
                    className="rounded text-black"
                  />
                  <span className="text-xs font-bold text-black">Personalizar Nome/Nº</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    resetProductForm();
                    setActiveTab('products');
                  }}
                  className="px-5 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 text-xs font-bold hover:bg-neutral-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#FFD900] hover:bg-[#E6C300] text-black text-xs font-black uppercase shadow"
                >
                  {editingProductId ? 'Salvar Alterações' : 'Cadastrar Camisa'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Settings */}
        {activeTab === 'settings' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <form onSubmit={handleSaveConfig} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-base font-black uppercase text-black pb-3 border-b border-neutral-100">
                  ⚙️ Configurações da Loja
                </h2>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Nome da Loja:
                  </label>
                  <input
                    type="text"
                    value={configStoreName}
                    onChange={(e) => setConfigStoreName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs font-bold text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    WhatsApp de Vendas (DDI + DDD + Número):*
                  </label>
                  <input
                    type="text"
                    value={configWhatsapp}
                    onChange={(e) => setConfigWhatsapp(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs font-black text-black focus:outline-none focus:border-black"
                    required
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Exemplo: 5511999999999 (sem traços ou parênteses)
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Instagram:
                  </label>
                  <input
                    type="text"
                    value={configInstagram}
                    onChange={(e) => setConfigInstagram(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Frase do Banner do Topo:
                  </label>
                  <input
                    type="text"
                    value={configBanner}
                    onChange={(e) => setConfigBanner(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-neutral-700 block mb-1">
                    Chave Pix para Recebimento:
                  </label>
                  <input
                    type="text"
                    value={configPixKey}
                    onChange={(e) => setConfigPixKey(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-neutral-300 rounded-lg px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#FFD900] hover:bg-[#E6C300] text-black text-xs font-black uppercase shadow"
                  >
                    Salvar Configurações
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-3">
                <h3 className="text-xs font-black uppercase text-black pb-2 border-b border-neutral-100">
                  Backup &amp; Catálogo
                </h3>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="w-full py-2 px-3 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-black text-xs font-bold uppercase transition"
                >
                  Exportar Catálogo (JSON)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Restaurar o catálogo padrão de demonstração?')) {
                      resetToDefaultProducts();
                      showNotification('🔄 Catálogo restaurado com sucesso!');
                    }
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-bold uppercase transition"
                >
                  Restaurar Padrão
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
