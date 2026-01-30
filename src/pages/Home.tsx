import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, Rocket, Globe, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../config';
import ProductCard from '../components/ProductCard';
import { useCocobase } from '../context/CocobaseContext';
import { Product } from '../types';

const Home: React.FC = () => {
  const { db } = useCocobase();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
        if (db) {
          try {
            // Attempt to fetch from Cocobase
            const remote = await db.listDocuments<Product>('products');
            if (remote && remote.length > 0) {
               // Extract .data from each document and merge .id
               const products = remote.map(doc => ({ ...doc.data, id: doc.id }));
               const featured = products.filter(p => p.featured).slice(0, 3);
               setFeaturedProducts(featured.length > 0 ? featured : PRODUCTS.slice(0, 3));
            } else {
             setFeaturedProducts(PRODUCTS.slice(0, 3));
          }
        } catch (error) {
          console.error("Home: Cocobase sync error, using local buffer.", error);
          setFeaturedProducts(PRODUCTS.slice(0, 3));
        }
      } else {
        setFeaturedProducts(PRODUCTS.slice(0, 3));
      }
    };
    fetchFeatured();
  }, [db]);

  const stats = [
    { label: 'Prototypes', value: '1,200+' },
    { label: 'Neural Links', value: '85k' },
    { label: 'Accuracy', value: '99.9%' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1f6feb] opacity-10 blur-[150px] animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-['Orbitron'] text-4xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter">
              <span className="block italic text-[#8b949e] text-xl md:text-3xl font-normal mb-2 uppercase tracking-[0.3em] md:tracking-[0.5em]">The Next Era of</span>
              <span className="bg-gradient-to-b from-white to-[#58a6ff] bg-clip-text text-transparent">HARDWARE</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-[#8b949e] text-lg md:text-xl mb-12 font-['Rajdhani'] leading-relaxed">
              Equip yourself with next-generation neural prototypes and advanced field gear. Systems calibrated for maximum tactical advantage.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-20">
              <Link to="/shop" className="px-10 py-4 bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] text-white font-['Orbitron'] font-bold rounded-full shadow-[0_0_20px_rgba(88,166,255,0.4)] hover:shadow-[0_0_40px_rgba(88,166,255,0.6)] hover:-translate-y-1 transition-all flex items-center gap-2 group">
                ENTER CATALOG <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-['Orbitron'] font-bold rounded-full hover:bg-white/10 transition-all">
                MISSION BRIEF
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-10 border-t border-white/5">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-white font-['Orbitron']">{stat.value}</div>
                  <div className="text-xs md:text-sm text-[#8b949e] uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[rgba(255,255,255,0.02)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-[#58a6ff] text-sm font-bold uppercase tracking-[0.3em] mb-4">Elite Gear</h2>
              <h3 className="font-['Orbitron'] text-4xl font-bold bg-gradient-to-r from-white to-[#8b949e] bg-clip-text text-transparent">FEATURED PROTOTYPES</h3>
            </div>
            <Link to="/shop" className="flex items-center gap-2 text-[#58a6ff] font-bold hover:gap-4 transition-all">
              VIEW FULL GRID <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Globe />, title: 'Global Grid', desc: 'Secure worldwide distribution via encrypted logistics.' },
              { icon: <Shield />, title: 'Neural Lock', desc: 'Every prototype is biometrically synced to its operative.' },
              { icon: <Zap />, title: 'Quantum Charge', desc: 'Advanced energy cells providing infinite field power.' },
              { icon: <Rocket />, title: 'Next-Gen', desc: 'Hardware that exists three years ahead of the public curve.' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center group"
              >
                <div className="mb-6 text-[#58a6ff] flex justify-center group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="font-['Orbitron'] text-lg font-bold mb-3">{feature.title}</h4>
                <p className="text-[#8b949e] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
