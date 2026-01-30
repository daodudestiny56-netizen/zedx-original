import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, Zap, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate encryption
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="font-['Orbitron'] text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            SECURE <span className="text-[#58a6ff]">UPLINK</span>
          </h1>
          <p className="text-[#8b949e] text-xl font-['Rajdhani'] leading-relaxed max-w-2xl mx-auto">
            Need technical assistance or custom hardware configuration? Establish a secure channel with our support operatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#58a6ff] group-hover:bg-[#58a6ff]/10 group-hover:border-[#58a6ff]/30 transition-all">
                   <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-['Orbitron'] text-sm font-bold uppercase tracking-widest mb-2">Neural Link</h4>
                  <p className="text-[#8b949e] font-medium text-lg">support@zedx-original.tech</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#58a6ff] group-hover:bg-[#58a6ff]/10 group-hover:border-[#58a6ff]/30 transition-all">
                   <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-['Orbitron'] text-sm font-bold uppercase tracking-widest mb-2">Direct Channel</h4>
                  <p className="text-[#8b949e] font-medium text-lg">+1 (888) ZEDX-ORIGIN</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#58a6ff] group-hover:bg-[#58a6ff]/10 group-hover:border-[#58a6ff]/30 transition-all">
                   <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-['Orbitron'] text-sm font-bold uppercase tracking-widest mb-2">Ops Base</h4>
                  <p className="text-[#8b949e] font-medium text-lg">Classified (Satellite Relay Only)</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#1f6feb]/10 to-transparent border border-[rgba(88,166,255,0.1)] rounded-3xl">
               <h4 className="font-['Orbitron'] text-xs font-bold text-[#58a6ff] uppercase tracking-[0.5em] mb-4">Network Status</h4>
               <div className="flex items-center gap-3 text-white text-sm">
                  <span className="w-2 h-2 bg-[#238636] rounded-full animate-pulse" />
                  All support nodes operational
               </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-2xl shadow-xl"
          >
            {sent ? (
              <div className="text-center py-20 animate-fade-in">
                 <div className="w-20 h-20 bg-[#238636]/20 rounded-full flex items-center justify-center mx-auto mb-8 text-[#238636]">
                    <Zap size={40} />
                 </div>
                 <h3 className="font-['Orbitron'] text-2xl font-bold mb-4">TRANSMISSION SENT</h3>
                 <p className="text-[#8b949e] mb-10">Your message has been encrypted and sent to our tactical support desk.</p>
                 <button 
                  onClick={() => setSent(false)}
                  className="text-[#58a6ff] font-bold hover:underline"
                 >
                   Send Another Transmission
                 </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">Identity</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Agent Name..."
                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 px-4 text-white outline-none focus:border-[#58a6ff] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">Uplink Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="agent@email.com"
                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 px-4 text-white outline-none focus:border-[#58a6ff] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#8b949e] ml-1">Transmission Data</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Report details..."
                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-4 px-4 text-white outline-none focus:border-[#58a6ff] transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] text-white font-['Orbitron'] font-bold rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(88,166,255,0.4)] transition-all flex items-center justify-center gap-2 group"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>ENCRYPT & SEND <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
