import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white pt-48 pb-20 px-10 border-t border-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
          
          <div className="max-w-sm">
            <h2 className="text-base font-black tracking-[0.4em] uppercase mb-8 text-gray-900">
              BB<span className="text-rose-400">.</span>SAFE
            </h2>
            <p className="text-[13px] text-gray-400 leading-[1.8] font-medium max-w-[280px]">
              Advanced safety protocols for the modern era. AI-driven protection, 
              simplified for ultimate peace of mind.
            </p>
          </div>

          <div className="flex gap-32">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-10">Product</h3>
              <ul className="space-y-5 text-[12px] font-bold uppercase tracking-[0.2em]">
                <li><Link to="/features" className="text-gray-900 hover:text-indigo-600 transition-colors duration-500">Features</Link></li>
                <li><Link to="/smart-route" className="text-gray-900 hover:text-indigo-600 transition-colors duration-500">Routes</Link></li>
                <li><Link to="/emergency" className="text-gray-900 hover:text-rose-500 transition-colors duration-500">Emergency</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-10">Connect</h3>
              <ul className="space-y-5 text-[12px] font-bold uppercase tracking-[0.2em]">
                <li><a href="#" className="text-gray-900 hover:text-indigo-600 transition-colors duration-500">Twitter</a></li>
                <li><a href="#" className="text-gray-900 hover:text-indigo-600 transition-colors duration-500">Instagram</a></li>
                <li><a href="mailto:hello@bbsafe.in" className="text-gray-900 hover:text-indigo-600 transition-colors duration-500">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-gray-100/50 gap-8">
          <div className="flex items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-300">
              © {new Date().getFullYear()} BB.SAFE
            </p>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-300">
              MAPPED IN INDIA
            </p>
          </div>
          
          <div className="flex gap-12">
             <a href="#" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-300 hover:text-gray-900 transition-colors duration-500">Privacy Policy</a>
             <a href="#" className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-300 hover:text-gray-900 transition-colors duration-500">Legal Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
