import React from 'react';

const AIThreat: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-32 px-10">
      <h1 className="text-5xl font-extralight mb-10 text-yellow-500">AI Threat Detection</h1>
      <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
        {/* Content goes here */}
        <p className="text-gray-400">Monitoring surrounding for potential threats...</p>
      </div>
    </div>
  );
};

export default AIThreat;
