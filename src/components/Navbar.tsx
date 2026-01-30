import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCocobase } from '../context/CocobaseContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { user, logout } = useCocobase();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 h-[80px] z-[1000] transition-all duration-300 flex items-center",
      isScrolled ? "bg-[rgba(10,14,39,0.95)] shadow-lg" : "bg-[rgba(10,14,39,0.8)] border-b border-[rgba(88,166,255,0.2)] backdrop-blur-xl"
    )}>
      <div className="container px-6 flex items-center justify-between mx-auto w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 font-['Orbitron'] text-xl font-bold tracking-widest text-white group">
          <Zap className="text-[#58a6ff] group-hover:animate-pulse" size={28} />
          <span>ZedX <span className="bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] bg-clip-text text-transparent">Original</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "font-['Rajdhani'] text-lg font-medium uppercase tracking-widest transition-all relative py-1",
                location.pathname === link.path ? "text-[#58a6ff]" : "text-[#8b949e] hover:text-[#58a6ff]"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#58a6ff] to-[#1f6feb]" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#f0f6fc] hover:text-[#58a6ff] transition-colors">
            <Search size={20} />
          </button>
          
          <Link to="/cart" className="relative p-2 text-[#f0f6fc] hover:text-[#58a6ff] transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#1f6feb] to-[#0d1117] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4 ml-2">
              <span className="hidden lg:block text-sm font-medium text-[#8b949e]">Agent: {user.name}</span>
              <button 
                onClick={() => { if(confirm('Terminate neural link?')) logout() }}
                className="p-2 text-[#58a6ff] hover:text-[#f85149] transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-2 text-[#f0f6fc] hover:text-[#58a6ff] transition-colors">
              <User size={20} />
            </Link>
          )}

          <button 
            className="md:hidden p-2 text-[#58a6ff]" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full min-h-screen bg-[#0d1117]/95 backdrop-blur-xl border-b border-[rgba(88,166,255,0.2)] p-6 md:hidden animate-fade-in shadow-2xl z-40">
          <div className="flex flex-col gap-8 items-center mt-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-2xl font-bold font-['Orbitron'] uppercase tracking-widest text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
