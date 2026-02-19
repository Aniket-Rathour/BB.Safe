import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, animate, useInView } from "framer-motion";

const Counter = ({ value, duration = 2, decimals = 0 }: { value: number, duration?: number, decimals?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
};

const MapPlaceholder = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative w-full h-[700px] bg-white rounded-[64px] overflow-hidden border border-gray-100 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.08)] group cursor-crosshair"
    >
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }}></div>
      
      <div 
        className="absolute pointer-events-none w-[800px] h-[800px] bg-indigo-200/40 rounded-full blur-[160px] transition-transform duration-500 ease-out"
        style={{ transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)` }}
      ></div>

      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600 rounded-full blur-[120px]"
      />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-400 rounded-full blur-[160px] opacity-10"></div>
      
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[1px] bg-indigo-500/30 z-10"
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          d="M 150 500 Q 350 450 400 300 T 800 200" 
          fill="none" 
          stroke="#10b981" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeDasharray="15 10"
          className="drop-shadow-2xl"
        />
        <motion.circle 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 3 }}
          cx="150" cy="500" r="8" fill="#10b981" 
        />
        <motion.circle 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 3 }}
          cx="800" cy="200" r="8" fill="#10b981" 
        />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between p-12 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] shadow-sm border border-gray-100 z-20 group-hover:translate-x-4 transition-transform duration-700">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2">Safety Vector</p>
            <p className="text-5xl font-black text-gray-900 tracking-tighter">98.2<span className="text-indigo-500 font-serif italic">%</span></p>
          </div>
          <div className="bg-gray-900/90 backdrop-blur-xl px-10 py-6 rounded-full border border-white/10 shadow-2xl flex items-center gap-6 group-hover:-translate-x-4 transition-transform duration-700">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.8)]"></span>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Live Node 42</p>
            </div>
            <div className="h-6 w-[1px] bg-white/10"></div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">Secure Protocol</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
           <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-4 group-hover:translate-y-[-10px] transition-transform duration-700">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Route Efficiency: 92%</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Risk Mitigation: Active</span>
              </div>
           </div>
           <div className="bg-gray-900/5 backdrop-blur px-8 py-6 rounded-full border border-gray-100 group-hover:scale-105 transition-transform duration-700">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                Lat: 28.6139° N / Lng: 77.2090° E
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const WorkStep = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -20, scale: 1.02 }}
    className="relative p-14 bg-white rounded-[64px] border border-gray-100 shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 group overflow-hidden"
  >
    <div className="text-[120px] font-black text-indigo-50 absolute -top-16 -right-6 group-hover:text-indigo-100 transition-colors opacity-30">{num}</div>
    <div className="relative z-10">
      <div className="w-16 h-16 bg-gray-50 rounded-3xl mb-10 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-500 shadow-sm">
        <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-white"></div>
      </div>
      <h3 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed text-base">{desc}</p>
    </div>
  </motion.div>
);

function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(dy, [-500, 500], [15, -15]);
  const rotateY = useTransform(dx, [-500, 500], [-15, 15]);
  const translateX = useTransform(dx, [-500, 500], [-40, 40]);
  const translateY = useTransform(dy, [-500, 500], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="bg-white text-gray-900">
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative px-10 pt-72 pb-56 overflow-hidden perspective-[2000px]"
      >
        <motion.div 
          style={{ rotateX, rotateY, translateX, translateY }}
          className="container mx-auto max-w-7xl text-center relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-8 py-3 mb-16 bg-indigo-50 rounded-full border border-indigo-100 shadow-sm shadow-indigo-100/20"
          >
             <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping"></span>
            <span className="text-[12px] font-black text-indigo-500 uppercase tracking-[0.5em]">System Live Protocol</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-8xl md:text-[160px] font-black tracking-[-0.05em] leading-[0.8] mb-20"
          >
            SAFE<span className="text-rose-400 italic font-serif tracking-normal">.</span><br />JOURNEY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto text-2xl font-medium leading-relaxed mb-24"
          >
            A sophisticated layer of protection for every step you take. 
            AI-driven, community-verified, and completely invisible.
          </motion.p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <button onClick={() => navigate('/smart-route')} className="h-24 px-20 bg-gray-900 text-white text-[15px] font-black uppercase tracking-[0.5em] rounded-full hover:bg-indigo-600 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] active:scale-95">
              Start Mission
            </button>
            <button onClick={() => navigate('/features')} className="text-[15px] font-black uppercase tracking-[0.5em] text-gray-900 hover:text-indigo-600 transition-colors duration-700">
              Explore Map
            </button>
          </div>
        </motion.div>
        <motion.div style={{ x: useTransform(dx, [-500, 500], [-80, 80]), y: useTransform(dy, [-500, 500], [-80, 80]) }} className="absolute top-1/4 right-0 -mr-32 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[180px] opacity-40 -z-10"></motion.div>
        <motion.div style={{ x: useTransform(dx, [-500, 500], [80, -80]), y: useTransform(dy, [-500, 500], [80, -80]) }} className="absolute bottom-1/4 left-0 -ml-32 w-[600px] h-[600px] bg-rose-100 rounded-full blur-[180px] opacity-40 -z-10"></motion.div>
      </section>

      <section className="px-10 pb-64">
        <div className="container mx-auto max-w-7xl">
          <MapPlaceholder />
        </div>
      </section>

      <section className="py-64 px-10 bg-gray-50/50 border-y border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-40">
            <p className="text-[12px] font-black uppercase tracking-[0.8em] text-indigo-500 mb-10">Engine Protocol</p>
            <h2 className="text-7xl md:text-[100px] font-black tracking-tighter text-gray-900">How It Works.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <WorkStep num="01" title="Data Collection" desc="Aggregating multi-source data including crime reports, lighting conditions, and real-time community pings." />
            <WorkStep num="02" title="AI Risk Processing" desc="Neural networks analyze patterns to identify potential threats and anomalies across the urban landscape." />
            <WorkStep num="03" title="Scoring Engine" desc="Every street segment is assigned a safety coefficient based on live and historical performance metrics." />
            <WorkStep num="04" title="Smart Output" desc="Your optimal, safest route is calculated and delivered via an intuitive navigation interface." />
          </div>
        </div>
      </section>

      <section className="py-72 px-10 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-32 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-12 shadow-sm border border-gray-100">
                <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
              </div>
              <p className="text-[12px] font-black uppercase tracking-[0.5em] text-gray-300 mb-8">System Uptime</p>
              <p className="text-8xl font-black text-gray-900 tracking-tighter mb-6">24/7</p>
              <p className="text-base text-gray-400 font-medium tracking-wide">Monitoring protocol alpha</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-12 shadow-sm border border-gray-100">
                <div className="w-3 h-3 bg-rose-400 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.5)]"></div>
              </div>
               <p className="text-[12px] font-black uppercase tracking-[0.5em] text-gray-300 mb-8">AI Response</p>
              <p className="text-8xl font-black text-gray-900 tracking-tighter mb-6">
                <Counter value={0.04} decimals={2} />s
              </p>
              <p className="text-base text-gray-400 font-medium tracking-wide">AI decision latency</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-12 shadow-sm border border-gray-100">
                <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
              </div>
               <p className="text-[12px] font-black uppercase tracking-[0.5em] text-gray-300 mb-8">Total Coverage</p>
              <p className="text-8xl font-black text-gray-900 tracking-tighter mb-6">
                <Counter value={12.8} decimals={1} />k
              </p>
              <p className="text-base text-gray-400 font-medium tracking-wide">Verified safe-hub nodes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
