import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ShieldCheck, Zap, Cpu, Layers } from 'lucide-react';
import { PRODUCTS } from '../config';
import { useCart } from '../context/CartContext';
import { useCocobase } from '../context/CocobaseContext';
import { Product } from '../types';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { db } = useCocobase();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (db) {
        try {
          const doc = await db.getDocument<Product>('products', id!);
          if (doc) {
            setProduct({ ...doc.data, id: doc.id });
          } else {
            setProduct(PRODUCTS.find(p => p.id === id) || null);
          }
        } catch (error) {
          const local = PRODUCTS.find(p => p.id === id);
          setProduct(local || null);
        }
      } else {
        const local = PRODUCTS.find(p => p.id === id);
        setProduct(local || null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id, db]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#1f6feb] border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!product) {
    return <div className="container mx-auto px-6 py-24 text-center">
      <h2 className="text-3xl font-bold mb-4">PROTOTYPE NOT FOUND</h2>
      <Link to="/shop" className="text-[#58a6ff] hover:underline">Return to Secure Catalog</Link>
    </div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors mb-12">
        <ArrowLeft size={18} /> BACK TO GRID
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group lg:sticky lg:top-32 h-fit"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1f6feb] to-transparent opacity-10 rounded-3xl" />
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-105"
          />
          {product.badge && (
            <div className="absolute top-6 left-6 bg-gradient-to-r from-[#1f6feb] to-[#0d1117] text-white px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl">
              {product.badge}
            </div>
          )}
        </motion.div>

        {/* Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div>
            <div className="text-[#58a6ff] text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-4">{product.category}</div>
            <h1 className="font-['Orbitron'] text-3xl md:text-5xl font-black mb-6 tracking-tight text-white">{product.name}</h1>
            <p className="text-[#8b949e] text-lg md:text-xl leading-relaxed font-['Rajdhani']">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-4xl font-bold font-['Orbitron'] bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] bg-clip-text text-transparent">
              ${product.price.toLocaleString()}
            </div>
            <div className="flex gap-1 text-[#ffb800]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl">★</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {product.features.map((feature, i) => (
               <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#58a6ff]/10 text-[#58a6ff] rounded-lg">
                    {i === 0 ? <Cpu size={16} /> : i === 1 ? <Layers size={16} /> : <Zap size={16} />}
                  </div>
                  <span className="text-sm font-medium text-[#f0f6fc]">{feature}</span>
               </div>
             ))}
          </div>

          <div className="space-y-4 pt-6">
            <button 
              onClick={() => addToCart(product)}
              className="w-full py-5 bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] text-white font-['Orbitron'] font-bold rounded-2xl shadow-[0_0_20px_rgba(88,166,255,0.4)] hover:shadow-[0_0_50px_rgba(88,166,255,0.6)] transition-all flex items-center justify-center gap-3 group"
            >
              <ShoppingCart size={22} className="group-hover:rotate-12 transition-transform" />
              EQUIP PROTOTYPE
            </button>
            <div className="flex items-center justify-center gap-6 text-[#484f58] text-xs font-bold uppercase tracking-[0.2em]">
               <div className="flex items-center gap-2">
                 <ShieldCheck size={14} className="text-[#238636]" /> Neural Link Secure
               </div>
               <div className="flex items-center gap-2">
                 <Zap size={14} className="text-[#58a6ff]" /> Lifetime Sync
               </div>
            </div>
          </div>

          {/* Additional Tech Spec Segment */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl border-dashed">
             <h4 className="font-['Orbitron'] text-xs font-bold text-[#58a6ff] uppercase tracking-[0.5em] mb-4">Neural Field Specs</h4>
             <ul className="space-y-3 text-[#8b949e] text-sm font-['Rajdhani']">
               <li className="flex justify-between border-b border-white/5 pb-2"><span>Connection Latency</span> <span className="text-white">0.02ms</span></li>
               <li className="flex justify-between border-b border-white/5 pb-2"><span>Encryption Standard</span> <span className="text-white">AES-4096-Q</span></li>
               <li className="flex justify-between"><span>Frame Material</span> <span className="text-white">Graphene Alloy</span></li>
             </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
