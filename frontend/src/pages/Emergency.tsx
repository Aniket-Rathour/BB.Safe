import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceWaveform = ({ isActive }: { isActive: boolean }) => (
  <div className="flex items-center justify-center gap-1.5 h-16">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        animate={isActive ? { 
          height: [10, Math.random() * 40 + 15, 10],
          backgroundColor: ['#6366f1', '#f43f5e', '#6366f1']
        } : { height: 4, backgroundColor: '#e5e7eb' }}
        transition={{ 
          duration: 0.5, 
          repeat: Infinity, 
          delay: i * 0.04,
          ease: "easeInOut"
        }}
        className="w-1.5 rounded-full"
      />
    ))}
  </div>
);

const Emergency: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [aiStatus, setAiStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setLastTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const sirenRef = useRef<HTMLAudioElement | null>(null);
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  // Keyword list for SOS trigger
  const SOS_KEYWORDS = ["unsafe", "help", "danger", "sos", "emergency", "help me", "attacker", "threat"];

  useEffect(() => {
    // Setup Siren Sound
    sirenRef.current = new Audio('https://www.soundjay.com/buttons/sounds/beep-01a.mp3'); // Fallback short beep
    const highQualitySiren = new Audio('https://actions.google.com/sounds/v1/emergency/ambulance_siren.ogg');
    sirenRef.current = highQualitySiren;
    sirenRef.current.loop = true;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript.toLowerCase();
        setLastTranscript(text);
        
        // Immediate Keyword Check
        const hasKeyword = SOS_KEYWORDS.some(keyword => text.includes(keyword));
        if (hasKeyword) {
          speak("Emergency keywords detected. Triggering maximum SOS signal now.");
          handleTrigger();
        } else {
          processWithAI(text);
        }
      };

      recognitionRef.current.onerror = () => setAiStatus('idle');
      recognitionRef.current.onend = () => {
        if (aiStatus === 'listening') setAiStatus('thinking');
      };
    }

    return () => {
      if (sirenRef.current) {
        sirenRef.current.pause();
        sirenRef.current.currentTime = 0;
      }
    };
  }, [aiStatus]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 1;
    utterance.onstart = () => setAiStatus('speaking');
    utterance.onend = () => {
      if (!isActive) setAiStatus('idle');
    };
    window.speechSynthesis.speak(utterance);
  };

  const processWithAI = async (userInput: string) => {
    setAiStatus('thinking');
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are BB.SAFE Emergency AI. Keep responses extremely short (max 2 sentences), calm, and helpful. Advise on safety and confirm authorities are being notified. If the user mentions 'unsafe', 'danger' or anything high-risk, tell them SOS is active."
            },
            { role: "user", content: userInput }
          ],
          model: 'llama-3.1-8b-instant',
          temperature: 0.6,
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      const content = data.choices[0].message.content;
      setAiResponse(content);
      speak(content);
    } catch (error) {
      console.error('AI Error:', error);
      speak("System error. Triggering manual SOS signal immediately.");
      handleTrigger();
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setAiStatus('listening');
      setAiResponse("");
      recognitionRef.current.start();
    } else {
      alert("Speech recognition not supported.");
    }
  };

  const handleTrigger = () => {
    setIsActive(true);
    if (sirenRef.current) {
      sirenRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    
    // Stop listening/thinking states
    if (recognitionRef.current) recognitionRef.current.stop();
    
    setTimeout(() => {
      alert("EMERGENCY SIGNAL BROADCASTED. Siren active. Authorities and family contacts have been notified.");
    }, 1000);
  };

  const stopEmergency = () => {
    setIsActive(false);
    setAiStatus('idle');
    if (sirenRef.current) {
      sirenRef.current.pause();
      sirenRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen pt-48 px-10 pb-40 relative overflow-hidden">
      
      {/* Background Warning Flash */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-500 pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border mb-12 transition-colors duration-500
            ${isActive ? 'bg-red-600 border-red-600 text-white' : 'bg-rose-50 border-rose-100 text-rose-500'}`}
        >
          <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isActive ? 'bg-white' : 'bg-rose-500'}`}></span>
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">
            {isActive ? "EMERGENCY BROADCAST ACTIVE" : "Protocol Alpha Active"}
          </span>
        </motion.div>

        <h1 className={`text-8xl md:text-[140px] font-black tracking-tighter mb-24 leading-[0.8] transition-colors duration-500
          ${isActive ? 'text-red-600' : 'text-gray-900'}`}>
          SOS<span className="text-rose-400 italic font-serif">.</span>
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-24">
          
          {/* SOS Trigger */}
          <div className="relative group cursor-pointer">
            <AnimatePresence>
              {isActive && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-red-600 rounded-full blur-[100px] -z-10"
                />
              )}
            </AnimatePresence>
            
            <motion.button 
              onClick={isActive ? stopEmergency : handleTrigger}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-80 h-80 rounded-full text-[13px] font-black uppercase tracking-[0.6em] shadow-2xl border-[24px] border-white transition-all duration-700 z-10
                ${isActive ? 'bg-red-600 text-white shadow-red-500/50' : 'bg-gray-900 text-white hover:bg-rose-500 shadow-gray-200'}`}
            >
              {isActive ? "STOP ALARM" : "Manual SOS"}
            </motion.button>
          </div>

          {/* AI Voice Assistant */}
          <div className="w-full max-w-md">
            <motion.div 
              animate={isActive ? { borderColor: '#ef4444', backgroundColor: '#fef2f2' } : {}}
              className="bg-white p-12 rounded-[64px] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] text-center relative overflow-hidden transition-colors duration-500"
            >
              <div className="mb-10 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4">Voice Neural Link</p>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Vocal Response</h3>
              </div>

              <div className="h-40 flex flex-col items-center justify-center mb-12">
                <VoiceWaveform isActive={aiStatus === 'listening' || aiStatus === 'speaking' || isActive} />
                
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={aiStatus}
                    className={`mt-8 text-xs font-black uppercase tracking-[0.3em] ${isActive ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`}
                  >
                    {isActive ? "ALERTING AUTHORITIES" : aiStatus === 'idle' ? "Ready to Listen" : aiStatus === 'listening' ? "System Listening..." : aiStatus === 'thinking' ? "Neural Processing..." : "AI Response Active"}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex gap-4">
                {!isActive && (
                  <button 
                    onClick={startListening}
                    disabled={aiStatus !== 'idle'}
                    className={`flex-1 h-20 rounded-[32px] flex items-center justify-center gap-4 transition-all duration-500 font-black uppercase tracking-widest text-[11px]
                      ${aiStatus === 'idle' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Speak
                  </button>
                )}
              </div>

              {(aiResponse || isActive) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-8 p-8 rounded-[40px] border text-left ${isActive ? 'bg-red-100 border-red-200' : 'bg-indigo-50/50 border-indigo-100'}`}
                >
                  <p className={`text-sm font-bold leading-relaxed italic ${isActive ? 'text-red-900' : 'text-indigo-900'}`}>
                    "{isActive ? "Emergency protocol active. Police have been dispatched. Do not close this app." : aiResponse}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-32 max-w-5xl mx-auto">
          <div className="p-12 bg-gray-50 rounded-[56px] border border-gray-100 text-left">
            <h3 className="text-xl font-black mb-6 text-gray-900 uppercase tracking-widest">Auto Siren</h3>
            <p className="text-gray-400 font-medium leading-relaxed text-sm">High-decibel alert activates automatically during voice triggers to deter nearby threats.</p>
          </div>
          <div className="p-12 bg-gray-50 rounded-[56px] border border-gray-100 text-left">
            <h3 className="text-xl font-black mb-6 text-gray-900 uppercase tracking-widest">Keyword Link</h3>
            <p className="text-gray-400 font-medium leading-relaxed text-sm">Saying 'unsafe', 'help', or 'danger' bypasses AI analysis for immediate SOS response.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Emergency;
