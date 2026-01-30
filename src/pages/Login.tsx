import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Zap, Github, Globe, Loader2 } from 'lucide-react';
import { useCocobase } from '../context/CocobaseContext';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';

const Login: React.FC = () => {
  const { db, refreshUser } = useCocobase();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (db) {
        const result = await db.auth.login({ email, password });
        if (result.requires_2fa) {
           setError("2FA Protocol required. Check your secure line.");
        } else {
           await refreshUser();
           navigate('/');
        }
      } else {
        // Mock fallback if db is not ready
        throw new Error("Neural link system offline. Please try again later.");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = (provider: string) => {
     setError(`${provider} uplink initialization: Integration pending.`);
  };

  return (
    <div className="container mx-auto px-6 py-24 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-2xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(88,166,255,0.4)]">
             <Zap size={32} fill="white" className="text-white" />
          </div>
          <h1 className="font-['Orbitron'] text-3xl font-black mb-2 tracking-tight">IDENTITY SCAN</h1>
          <p className="text-[#8b949e] font-['Rajdhani'] uppercase tracking-widest text-sm">Initialize Secure Neural Link</p>
        </div>

        {error && (
          <div className="bg-[#f85149]/10 border border-[#f85149]/20 text-[#f85149] px-4 py-3 rounded-xl mb-6 text-sm text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">E-Mail Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#484f58]" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#58a6ff] transition-all"
                placeholder="agent@zedx.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">Access Cipher</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#484f58]" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#58a6ff] transition-all"
                placeholder="••••••••"
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-xs text-[#58a6ff] hover:underline">Forgot Access Cypher?</a>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] text-white font-['Orbitron'] font-bold rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(88,166,255,0.4)] transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "INITIATE UPLINK"}
          </button>
        </form>

        <div className="relative my-10">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
           <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-[#0b0f1a] px-4 text-[#484f58]">Social Protocol</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button 
            onClick={() => socialLogin('Google')}
            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold text-sm"
           >
             <Globe size={18} /> Google
           </button>
           <button 
            onClick={() => socialLogin('GitHub')}
            className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold text-sm"
           >
             <Github size={18} /> GitHub
           </button>
        </div>

        <p className="text-center mt-10 text-[#8b949e] text-sm">
          New Operative? <Link to="/signup" className="text-[#58a6ff] font-bold hover:underline">Register Identity</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
