import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Zap, Loader2, ShieldCheck } from 'lucide-react';
import { useCocobase } from '../context/CocobaseContext';
import { motion } from 'framer-motion';

const Signup: React.FC = () => {
  const { db } = useCocobase();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Access Ciphers do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (db) {
        await db.auth.register({
          email: formData.email,
          password: formData.password,
          data: { name: formData.name }
        });
        navigate('/login');
      } else {
        throw new Error("Neural registration system offline.");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-2xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-r from-[#238636] to-[#0d1117] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(35,134,54,0.3)]">
             <ShieldCheck size={32} className="text-[#238636]" />
          </div>
          <h1 className="font-['Orbitron'] text-3xl font-black mb-2 tracking-tight">IDENTITY REGISTRY</h1>
          <p className="text-[#8b949e] font-['Rajdhani'] uppercase tracking-widest text-sm">Register as New Operative</p>
        </div>

        {error && (
          <div className="bg-[#f85149]/10 border border-[#f85149]/20 text-[#f85149] px-4 py-3 rounded-xl mb-6 text-sm text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">Full Agent Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#484f58]" size={18} />
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#58a6ff] transition-all"
                placeholder="Agent Name..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">Uplink Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#484f58]" size={18} />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#58a6ff] transition-all"
                placeholder="agent@zedx.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">Access Cipher</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#484f58]" size={18} />
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#58a6ff] transition-all text-xs"
                  placeholder="Cipher..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">Confirm Cipher</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#484f58]" size={18} />
                <input 
                  type="password" 
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#58a6ff] transition-all text-xs"
                  placeholder="Verify..."
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#238636] to-[#1f6feb] text-white font-['Orbitron'] font-bold rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(35,134,54,0.4)] transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "CREATE IDENTITY"}
          </button>
        </form>

        <p className="text-center mt-10 text-[#8b949e] text-sm font-['Rajdhani']">
          Already Registered? <Link to="/login" className="text-[#58a6ff] font-bold hover:underline">Establish Link</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
