import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Mail, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070a] border-t border-[rgba(88,166,255,0.1)] pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 font-['Orbitron'] text-xl font-bold tracking-widest text-white">
              <Zap className="text-[#58a6ff]" size={28} />
              <span>ZedX <span className="bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] bg-clip-text text-transparent">Original</span></span>
            </Link>
            <p className="text-[#8b949e] leading-relaxed">
              Equipping modern operatives with next-generation hardware prototypes. Experience the future of advanced gear.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[rgba(255,255,255,0.05)] rounded-lg text-[#8b949e] hover:text-[#58a6ff] hover:bg-[rgba(88,166,255,0.1)] transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[rgba(255,255,255,0.05)] rounded-lg text-[#8b949e] hover:text-[#58a6ff] hover:bg-[rgba(88,166,255,0.1)] transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[rgba(255,255,255,0.05)] rounded-lg text-[#8b949e] hover:text-[#58a6ff] hover:bg-[rgba(88,166,255,0.1)] transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-bold mb-6 text-white uppercase tracking-wider">Quick Access</h4>
            <ul className="flex flex-col gap-4 text-[#8b949e]">
              <li><Link to="/shop" className="hover:text-[#58a6ff] transition-colors">Shop Catalog</Link></li>
              <li><Link to="/about" className="hover:text-[#58a6ff] transition-colors">About Mission</Link></li>
              <li><Link to="/contact" className="hover:text-[#58a6ff] transition-colors">Contact Support</Link></li>
              <li><Link to="/signup" className="hover:text-[#58a6ff] transition-colors">Create Identity</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-bold mb-6 text-white uppercase tracking-wider">Catalog</h4>
            <ul className="flex flex-col gap-4 text-[#8b949e]">
              <li><Link to="/shop?category=smartphones" className="hover:text-[#58a6ff] transition-colors">Neural Phones</Link></li>
              <li><Link to="/shop?category=laptops" className="hover:text-[#58a6ff] transition-colors">Cyber Units</Link></li>
              <li><Link to="/shop?category=wearables" className="hover:text-[#58a6ff] transition-colors">Advanced Wearables</Link></li>
              <li><Link to="/shop?category=audio" className="hover:text-[#58a6ff] transition-colors">Sonic Transmitters</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-['Orbitron'] text-lg font-bold mb-6 text-white uppercase tracking-wider">Secure Channel</h4>
            <p className="text-[#8b949e] mb-6">Receive encrypted updates on new prototype releases.</p>
            <div className="flex bg-[rgba(255,255,255,0.05)] p-1 rounded-full border border-[rgba(88,166,255,0.1)]">
              <input 
                type="email" 
                placeholder="Agent Email..." 
                className="bg-transparent border-none outline-none px-4 py-2 text-white w-full placeholder:text-[#484f58]"
              />
              <button className="bg-[#1f6feb] text-white p-2 rounded-full hover:bg-[#58a6ff] transition-colors">
                <Zap size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.05)] pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#484f58] text-sm">&copy; 2026 ZedX Original. All systems operational.</p>
          <div className="flex gap-8 text-[#484f58] text-sm">
            <a href="#" className="hover:text-[#8b949e]">Privacy Protocol</a>
            <a href="#" className="hover:text-[#8b949e]">Terms of Service</a>
            <a href="#" className="hover:text-[#8b949e]">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
