import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(0,240,255,0.1)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:border-[#58a6ff]"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#1f6feb] to-[#0d1117] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          {product.badge}
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-black/30">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
           <Link 
            to={`/product/${product.id}`}
            className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-[#58a6ff] hover:text-black transition-all"
            title="View Specs"
           >
            <Eye size={20} />
           </Link>
           <button 
            onClick={() => addToCart(product)}
            className="w-12 h-12 flex items-center justify-center bg-[#58a6ff]/20 backdrop-blur-md rounded-xl text-[#58a6ff] border border-[#58a6ff]/30 hover:bg-[#58a6ff] hover:text-black transition-all"
            title="Equip Item"
           >
            <ShoppingCart size={20} />
           </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="text-[#58a6ff] text-xs font-bold uppercase tracking-widest mb-1">{product.category}</div>
        <h3 className="font-['Orbitron'] text-lg font-bold mb-2 group-hover:text-[#58a6ff] transition-colors">{product.name}</h3>
        <p className="text-[#8b949e] text-sm line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] bg-clip-text text-transparent font-['Orbitron']">
            ${product.price.toLocaleString()}
          </span>
          <div className="flex text-[#ffb800]">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" className="opacity-30" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
