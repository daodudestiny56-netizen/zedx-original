import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-white/5 border border-white/10 p-12 rounded-3xl max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-[#484f58]">
            <ShoppingBag size={40} />
          </div>
          <h2 className="font-['Orbitron'] text-3xl font-bold mb-4">YOUR DEPOT IS EMPTY</h2>
          <p className="text-[#8b949e] mb-10 leading-relaxed max-w-sm mx-auto">
            You haven't equipped any hardware prototypes yet. Scan the catalog to initialize your gear.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] text-white font-['Orbitron'] font-bold rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(88,166,255,0.4)] transition-all">
            RETURN TO CATALOG <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-['Orbitron'] text-4xl font-black mb-12 tracking-wide">EQUIPMENT DEPOT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
            >
              <img src={item.image} alt={item.name} className="w-full sm:w-24 h-24 object-cover rounded-xl" />
              <div className="flex-grow w-full text-center sm:text-left">
                <div className="text-[#58a6ff] text-[10px] font-bold uppercase tracking-widest">{item.category}</div>
                <h3 className="font-['Orbitron'] text-lg font-bold text-white mb-2">{item.name}</h3>
                <div className="text-[#8b949e] text-sm">${item.price.toLocaleString()} unit</div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl border border-white/10">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="w-full sm:w-auto flex justify-between sm:block items-center mt-4 sm:mt-0">
                 <div className="text-xl font-bold font-['Orbitron']">${(item.price * item.quantity).toLocaleString()}</div>
                 <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#f85149] hover:underline text-xs flex items-center gap-1 sm:justify-end mt-2"
                >
                  <Trash2 size={12} /> REMOVE
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="font-['Orbitron'] text-xl font-bold mb-8 text-white uppercase tracking-widest">Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[#8b949e]">
                <span>Neural Credits (Subtotal)</span>
                <span className="text-white">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#8b949e]">
                <span>Secured Uplink (Shipping)</span>
                <span className="text-[#238636] font-bold">FREE</span>
              </div>
              <div className="border-t border-white/5 pt-4 flex justify-between">
                <span className="text-xl font-bold text-white">TOTAL</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] bg-clip-text text-transparent font-['Orbitron']">
                  ${cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] text-white font-['Orbitron'] font-bold rounded-xl shadow-[0_0_20px_rgba(88,166,255,0.2)] hover:shadow-[0_0_40px_rgba(88,166,255,0.4)] transition-all flex items-center justify-center gap-2 group">
              FINALIZE LINK <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Guarantees */}
          <div className="space-y-4 p-4">
             <div className="flex items-center gap-4 text-[#8b949e] text-sm font-['Rajdhani']">
                <ShieldCheck className="text-[#58a6ff]" size={18} />
                <span>Encrypted Military-Grade Transactions</span>
             </div>
             <div className="flex items-center gap-4 text-[#8b949e] text-sm font-['Rajdhani']">
                <Truck className="text-[#58a6ff]" size={18} />
                <span>Stealth Logistics Protocol (Free Shipping)</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
