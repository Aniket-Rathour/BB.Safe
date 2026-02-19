import React, { useState, useEffect } from "react";

const ContactSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
      
      {/* Note: /earth2.png should exist in public folder for this to work */}
      <img
        src="/earth2.png"
        alt="Earth"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-20 px-4">
        <h2 className="text-3xl md:text-5xl font-bold">
          Travel Smarter. Travel Safer.
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          AI-powered protection for every journey.
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition">
          GET STARTED
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
