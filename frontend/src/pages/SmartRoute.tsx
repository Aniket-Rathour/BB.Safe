import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MapOverlay = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 pointer-events-none z-10"
    >
      {/* 🔴 High Danger Zones */}
      <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
      <div className="absolute top-[60%] right-[10%] w-[450px] h-[450px] bg-red-600 rounded-full blur-[130px] opacity-35"></div>

      {/* 🟡 Moderate Risk Zones */}
      <div className="absolute top-[40%] left-[45%] w-[600px] h-[600px] bg-amber-500 rounded-full blur-[140px] opacity-30"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-amber-400 rounded-full blur-[120px] opacity-25"></div>

      {/* 🟢 Safe Corridors */}
      <div className="absolute top-[10%] right-[20%] w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[150px] opacity-30"></div>
      <div className="absolute bottom-[5%] right-[5%] w-[550px] h-[550px] bg-emerald-400 rounded-full blur-[150px] opacity-40"></div>

      {/* ⚪ Neutral / Transition Zones */}
      <div className="absolute top-[50%] left-[10%] w-[400px] h-[400px] bg-slate-300 rounded-full blur-[130px] opacity-20"></div>
      <div className="absolute bottom-[40%] right-[40%] w-[500px] h-[500px] bg-slate-200 rounded-full blur-[160px] opacity-15"></div>
      
      {/* Small Data Pings */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-4 h-4 bg-indigo-400 rounded-full blur-sm"
          style={{ 
            top: `${Math.random() * 80 + 10}%`, 
            left: `${Math.random() * 80 + 10}%` 
          }}
        />
      ))}
    </motion.div>
  );
};

const SmartRoute: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [safetyMode, setSafetyMode] = useState(true);

  const triggerSearch = () => {
    setIsSearching(true);
    setShowRoutes(false);
    setTimeout(() => {
      setIsSearching(false);
      setShowRoutes(true);
    }, 1500);
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden text-gray-900 font-sans">
      
      {/* 1. The Map Layer (Base) */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827114312!2d77.20651515541992!3d28.6289201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d397%3A0x60320a006c30f40!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) brightness(1.05)' }}
          allowFullScreen={true}
          loading="lazy"
          className="w-full h-full"
        ></iframe>
        
        {/* Safety Airbrushing Layer */}
        <MapOverlay />

        {/* 2. Route SVG Layer (On top of Map) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <AnimatePresence>
            {showRoutes && (
              <>
                {/* Danger Route (Red Dashed) */}
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M 300 800 Q 600 600 900 500 T 1500 300" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeDasharray="12 18"
                />
                
                {/* Alternative Route (Yellow) */}
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                  d="M 300 800 Q 500 750 700 700 T 1500 300" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                />

                {/* Safest Route (Glowing Emerald) */}
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                  d="M 300 800 Q 400 500 1000 400 T 1500 300" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  className="drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                />

                <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3 }} cx="300" cy="800" r="10" fill="#4f46e5" className="shadow-2xl" />
                <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3.2 }} cx="1500" cy="300" r="10" fill="#10b981" className="shadow-2xl" />
              </>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* 3. Floating UI Overlay Layer (High Z-Index) */}
      <div className="relative z-30 w-full h-full pointer-events-none flex flex-col justify-between p-12 pt-36">
        
        {/* Top Bar: Search & Score */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pointer-events-auto">
          
          <motion.div 
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-3xl bg-white/90 backdrop-blur-2xl border border-gray-100 rounded-[40px] p-2 flex items-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
          >
            <div className="flex-1 flex items-center px-10 gap-5">
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></div>
              <input 
                type="text" 
                placeholder="Enter safest destination..." 
                className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-base font-bold uppercase tracking-widest w-full"
              />
            </div>
            <button 
              onClick={triggerSearch}
              className="h-16 px-12 bg-gray-900 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-[32px] hover:bg-indigo-600 transition-all duration-700 shadow-xl"
            >
              {isSearching ? "Computing..." : "Optimize"}
            </button>
          </motion.div>

          <motion.div 
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl border border-emerald-100 rounded-[40px] px-12 py-8 flex flex-col items-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-3">Safe Index</p>
            <div className="flex items-baseline">
              <span className="text-6xl font-black text-gray-900 tracking-tighter">98.2</span>
              <span className="text-lg font-bold text-gray-300 ml-1">%</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Details & Control */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 pointer-events-auto">
          
          <AnimatePresence>
            {showRoutes && (
              <motion.div 
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-md bg-white/95 backdrop-blur-3xl border border-gray-100 rounded-[56px] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]"
              >
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 leading-none">Optimal Path</h2>
                    <span className="text-4xl font-black text-indigo-600 tracking-tighter">14<span className="text-sm text-gray-400 font-bold ml-1 uppercase tracking-widest">min</span></span>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">Safe Route</span>
                    <span className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">AI Active</span>
                  </div>
                </div>

                <div className="space-y-5">
                   <div className="flex justify-between items-center p-6 bg-gray-50/50 rounded-[32px] border border-gray-50">
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Confidence</span>
                      <span className="text-[11px] font-black text-indigo-500 uppercase tracking-widest tracking-[0.2em]">99.4%</span>
                   </div>
                   <div className="flex justify-between items-center p-6 bg-gray-50/50 rounded-[32px] border border-gray-50">
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Live Heatmap</span>
                      <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest tracking-[0.2em]">Synced</span>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-6 items-end">
            <motion.button 
              onClick={() => setSafetyMode(!safetyMode)}
              className={`h-20 px-12 rounded-full border flex items-center gap-8 transition-all duration-700 shadow-2xl
                ${safetyMode ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-100 text-gray-900 hover:border-indigo-200'}`}
            >
              <div className={`w-12 h-6 rounded-full p-1 relative transition-colors ${safetyMode ? 'bg-white/20' : 'bg-gray-100'}`}>
                <motion.div 
                  animate={{ x: safetyMode ? 24 : 0 }}
                  className={`w-4 h-4 rounded-full shadow-sm ${safetyMode ? 'bg-white' : 'bg-indigo-500'}`}
                />
              </div>
              <span className="text-[12px] font-black uppercase tracking-[0.4em]">Safety Priority</span>
            </motion.button>
            
            <div className="bg-white/90 backdrop-blur-xl p-4 rounded-full border border-gray-100 shadow-2xl flex gap-4">
              <button className="w-14 h-14 rounded-full bg-gray-50 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center font-bold text-gray-400 text-xl shadow-inner">+</button>
              <button className="w-14 h-14 rounded-full bg-gray-50 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center font-bold text-gray-400 text-xl shadow-inner">-</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SmartRoute;
