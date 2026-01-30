import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Grid, List as ListIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../config';
import ProductCard from '../components/ProductCard';
import { useCocobase } from '../context/CocobaseContext';
import { Product } from '../types';

const Shop: React.FC = () => {
  const { db } = useCocobase();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['all', 'smartphones', 'laptops', 'wearables', 'audio'];

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (db) {
        try {
          const remote = await db.listDocuments<Product>('products');
          if (remote && remote.length > 0) {
            setProducts(remote.map(doc => ({ ...doc.data, id: doc.id })));
          } else {
            setProducts(PRODUCTS);
          }
        } catch (error) {
          console.error("Shop: Cocobase sync error, using local data.", error);
          setProducts(PRODUCTS);
        }
      } else {
        setProducts(PRODUCTS);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [db]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-['Orbitron'] text-4xl md:text-5xl font-black mb-4 tracking-tighter">THE CATALOG</h1>
        <p className="text-[#8b949e] font-['Rajdhani'] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#238636] animate-pulse"></span>
          System Online: {filteredProducts.length} Neural Interlinks Available
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        {/* Search */}
        <div className="flex-grow relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#484f58]" size={20} />
          <input 
            type="text" 
            placeholder="Search prototypes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-[#484f58] outline-none focus:border-[#58a6ff] transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat ? 'bg-[#1f6feb] text-white' : 'text-[#8b949e] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[#8b949e] outline-none focus:border-[#58a6ff] cursor-pointer"
          >
            <option value="newest">Sort: Identity</option>
            <option value="price-low">Sort: Credits Low</option>
            <option value="price-high">Sort: Credits High</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
           <div className="w-12 h-12 border-4 border-[#1f6feb] border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[#8b949e] font-['Rajdhani'] uppercase tracking-widest italic">Syncing with Cocobase Grid...</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-white/5 border border-dashed border-white/10 rounded-3xl">
           <Search size={48} className="mx-auto text-[#484f58] mb-4" />
           <p className="text-[#8b949e] text-xl">No prototypes match your search parameters.</p>
           <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="mt-6 text-[#58a6ff] font-bold hover:underline"
           >
             Clear System Filters
           </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
