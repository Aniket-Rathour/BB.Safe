import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen pt-32 px-6 pb-20">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-black mb-10 text-indigo-600 tracking-tight text-center">Our Mission</h1>
        <div className="space-y-8 text-gray-500 text-xl leading-relaxed text-left bg-gray-50 p-12 rounded-[40px] border border-gray-100">
          <p className="first-letter:text-5xl first-letter:font-black first-letter:text-indigo-600 first-letter:float-left first-letter:mr-3">
            BACHCHI BACHAO is dedicated to creating a world where safety is a universal guarantee, not a luxury. 
            By leveraging advanced AI and real-time community data, we empower women and children with tools 
            that make navigation safer and response times faster.
          </p>
          <p>
            We believe that through intelligent routing and proactive threat detection, we can 
            significantly reduce risks and build a community-driven safety net.
          </p>
          <div className="pt-8 grid grid-cols-2 gap-10">
            <div>
              <p className="text-4xl font-black text-indigo-600 mb-2">100%</p>
              <p className="text-sm font-bold text-gray-400 uppercase">Non-Profit Focus</p>
            </div>
             <div>
              <p className="text-4xl font-black text-indigo-600 mb-2">Open</p>
              <p className="text-sm font-bold text-gray-400 uppercase">Data Initiative</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
