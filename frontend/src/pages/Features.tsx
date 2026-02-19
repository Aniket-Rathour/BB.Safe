import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CORE_INNOVATIONS = [
  { id: 1, title: "Smart Route", desc: "AI-driven pathfinding that prioritizes safety over distance.", color: "indigo" },
  { id: 2, title: "Safety Score", desc: "Real-time numerical validation of every street segment.", color: "emerald" },
  { id: 3, title: "Heatmap", desc: "High-fidelity visualization of city-wide safety zones.", color: "rose" },
  { id: 4, title: "AI Threat", desc: "Advanced anomaly detection for suspicious patterns.", color: "indigo" },
  { id: 5, title: "Vibe Route", desc: "Heuristic navigation that avoids high-tension areas.", color: "amber" },
  { id: 6, title: "Data Fusion", desc: "Integration of crime records and live community reporting.", color: "emerald" }
];

const UNIQUE_PROTOCOLS = [
  { title: "Predictive Risk Mapping", desc: "AI models that forecast incidents before they occur.", detail: "Analyzing historical crime vectors and temporal spikes." },
  { title: "Silent Evidence Capture", desc: "Auto record and cloud-sync during identified threats.", detail: "High-bitrate encryption with immediate cloud redundant storage." },
  { title: "Shadow Detection", desc: "Intelligently detects persistent followers.", detail: "Angular velocity and persistent vector matching algorithms." },
  { title: "Community Safe Corridor", desc: "Verified 'Safe Hubs' for emergency sanctuary.", detail: "Real-time verification of hub personnel and proximity scoring." },
  { title: "Smart Check-In", desc: "Context-aware pings at journey milestones.", detail: "Adaptive frequency based on current environmental risk index." },
  { title: "Emergency Power Trigger", desc: "Rapid SOS via hardware button sequences.", detail: "Kernel-level intercept for immediate bypass of lock screens." }
];

const Features: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Pinned Circle Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=5000",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      }
    });

    CORE_INNOVATIONS.forEach((_, index) => {
      const angle = (index / CORE_INNOVATIONS.length) * 360;
      tl.to(circleRef.current, { rotate: -angle, duration: 1, ease: "power2.inOut" }, index > 0 ? "+=0.5" : 0);
      const featureTexts = gsap.utils.toArray('.feature-text');
      tl.fromTo(featureTexts[index] as HTMLElement, 
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" }, "<"
      );
      if (index < CORE_INNOVATIONS.length - 1) {
        tl.to(featureTexts[index] as HTMLElement, { opacity: 0, y: -30, filter: "blur(10px)", duration: 1, ease: "power2.in" }, "+=1");
      }
    });

    // 2. AI Protocol Stack Staggered Animation
    gsap.from(".protocol-card", {
      scrollTrigger: {
        trigger: ".protocol-grid",
        start: "top 70%",
      },
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.out"
    });

  }, { scope: container });

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      
      {/* 1. Header Section */}
      <section className="pt-64 pb-32 px-10 text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.6em] text-indigo-500 mb-10">Intelligence Layer</p>
        <h1 className="text-8xl md:text-[140px] font-black tracking-tighter mb-16 leading-[0.8] animate-in fade-in slide-in-from-bottom-10 duration-1000">Core<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-400 italic font-serif tracking-normal leading-tight">Innovations.</span></h1>
      </section>

      {/* 2. Pinned Scroll Section */}
      <div ref={container} className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-gray-50/30">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[600px] h-[600px] border border-gray-100 rounded-full animate-pulse"></div>
           <div className="w-[900px] h-[900px] border border-gray-50 rounded-full absolute"></div>
        </div>
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-center gap-32 relative z-10">
          <div className="relative w-[500px] h-[500px] shrink-0 scale-90 md:scale-100">
            <div ref={circleRef} className="w-full h-full relative transition-transform duration-700">
              {CORE_INNOVATIONS.map((item, index) => {
                const angle = (index / CORE_INNOVATIONS.length) * 2 * Math.PI;
                const x = Math.cos(angle) * 220;
                const y = Math.sin(angle) * 220;
                return (
                  <div key={item.id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: `translate(${x}px, ${y}px)` }}>
                    <div className="w-20 h-20 bg-white rounded-3xl border border-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] flex items-center justify-center" style={{ transform: `rotate(${(index / CORE_INNOVATIONS.length) * 360}deg)` }}>
                      <div className={`w-3 h-3 rounded-full ${item.color === 'indigo' ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : item.color === 'rose' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="absolute top-1/2 right-[-30px] -translate-y-1/2 flex items-center gap-6">
              <div className="w-12 h-[2px] bg-indigo-600"></div>
              <div className="w-5 h-5 rounded-full border-[3px] border-indigo-600 bg-white shadow-xl shadow-indigo-100"></div>
            </div>
          </div>
          <div ref={textRef} className="relative w-full max-w-xl h-72">
            {CORE_INNOVATIONS.map((item, index) => (
              <div key={item.id} className="feature-text absolute inset-0 flex flex-col justify-center opacity-0">
                <p className="text-[13px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-8">System Protocol 0{index + 1}</p>
                <h3 className="text-6xl font-black text-gray-900 mb-8 tracking-tighter">{item.title}</h3>
                <p className="text-2xl text-gray-400 font-medium leading-relaxed max-w-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Enhanced AI Protocol Section */}
      <section className="py-64 px-10 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/20 skew-x-12 translate-x-32 -z-10"></div>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-10">
            <div className="max-w-xl">
              <p className="text-[12px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-8">System Architecture</p>
              <h2 className="text-6xl font-black tracking-tighter text-gray-900 leading-[0.9]">AI Protocol<br/><span className="text-indigo-600/20 italic font-serif">Deep Stack.</span></h2>
            </div>
            <p className="text-gray-400 font-medium max-w-xs text-sm leading-relaxed border-l border-gray-100 pl-8">
              Underlying neural layers that process environmental vectors in real-time for zero-latency protection.
            </p>
          </div>
          <div className="protocol-grid grid md:grid-cols-2 gap-x-16 gap-y-16">
            {UNIQUE_PROTOCOLS.map((p, idx) => (
              <motion.div 
                key={p.title}
                whileHover={{ y: -15 }}
                className="protocol-card bg-gray-50/50 p-12 rounded-[60px] border border-gray-100 hover:bg-white hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 text-[100px] font-black text-indigo-500/5 select-none pointer-events-none group-hover:text-indigo-500/10 transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="relative z-10">
                  <h3 className="text-4xl font-black mb-8 text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                  <p className="text-lg text-gray-500 font-medium leading-relaxed mb-6">{p.desc}</p>
                  <p className="text-sm text-gray-300 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700">{p.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Awesome Tag Section */}
      <section className="py-64 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="container mx-auto max-w-7xl px-10 relative z-10">
          <div className="text-center mb-32">
            <p className="text-[12px] font-black uppercase tracking-[0.6em] text-indigo-400 mb-10">System Expansion</p>
            <h2 className="text-6xl font-black tracking-tighter">Support Nodes<span className="text-indigo-500">.</span></h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {[
              "Live Sharing", "Fake Call Mode", "SOS Shake", "Voice Nav", "Offline Mode",
              "Aadhaar Verify", "Unsafe Spot Report", "Safety Streak", "Guardian Mode", "Safe Echo"
            ].map((s, idx) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: '#4f46e5', 
                  borderColor: '#4f46e5',
                  boxShadow: '0 0 50px rgba(79, 70, 229, 0.4)'
                }}
                className="px-12 py-8 rounded-[32px] border border-white/10 bg-white/5 text-[14px] font-black uppercase tracking-[0.3em] text-gray-400 shadow-sm transition-all duration-500 cursor-default"
              >
                {s}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Features;
