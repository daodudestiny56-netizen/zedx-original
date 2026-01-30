import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="font-['Orbitron'] text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            THE ZEDX <span className="bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] bg-clip-text text-transparent">MANIFESTO</span>
          </h1>
          <p className="text-[#8b949e] text-xl font-['Rajdhani'] leading-relaxed">
            Since 2024, ZedX has been the primary provider of advanced hardware prototypes for the next generation of global operatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-10 bg-white/5 border border-white/10 rounded-3xl"
          >
            <div className="w-12 h-12 bg-[#58a6ff]/20 text-[#58a6ff] rounded-xl flex items-center justify-center mb-6">
               <Target size={24} />
            </div>
            <h3 className="font-['Orbitron'] text-2xl font-bold mb-4">Our Objective</h3>
            <p className="text-[#8b949e] leading-relaxed font-['Rajdhani']">
              To bridge the gap between current civilian technology and the classified prototypes used in specialized field operations. We believe every individual should have access to high-spec hardware that pushes the boundaries of possibility.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-10 bg-white/5 border border-white/10 rounded-3xl"
          >
            <div className="w-12 h-12 bg-[#238636]/20 text-[#238636] rounded-xl flex items-center justify-center mb-6">
               <Users size={24} />
            </div>
            <h3 className="font-['Orbitron'] text-2xl font-bold mb-4">The Collective</h3>
            <p className="text-[#8b949e] leading-relaxed font-['Rajdhani']">
              Our team consists of rogue engineers, industrial designers, and security specialists from across the globe. Together, we refine experimental tech into consumer-ready prototypes that maintain their edge.
            </p>
          </motion.div>
        </div>

        {/* Vision Section */}
        <section className="bg-white/5 border border-white/10 p-12 rounded-[3rem] relative overflow-hidden mb-24">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#1f6feb] opacity-5 blur-[100px]" />
           <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="font-['Orbitron'] text-3xl font-bold mb-6">NO COMPROMISE</h3>
              <p className="text-[#8b949e] mb-10 font-['Rajdhani'] text-lg">
                We don't build products. We build instruments for the modern agent. Every line of code and every micro-component is optimized for performance over mass-market appeal.
              </p>
              <div className="flex justify-center gap-12">
                 <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">100%</div>
                    <div className="text-[10px] text-[#484f58] uppercase tracking-[0.3em]">Syntech Frame</div>
                 </div>
                 <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">0.0s</div>
                    <div className="text-[10px] text-[#484f58] uppercase tracking-[0.3em]">Input Delay</div>
                 </div>
                 <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">∞</div>
                    <div className="text-[10px] text-[#484f58] uppercase tracking-[0.3em]">Potential</div>
                 </div>
              </div>
           </div>
        </section>

        <div className="text-center pb-24 border-b border-white/5">
           <Zap className="mx-auto text-[#58a6ff] mb-8" size={48} />
           <h4 className="font-['Orbitron'] text-xl font-bold mb-4 tracking-widest text-[#484f58]">OPERATIONAL GLOBALLY</h4>
           <div className="flex justify-center gap-4 text-[#484f58]">
              <Globe size={20} />
              <Shield size={20} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
