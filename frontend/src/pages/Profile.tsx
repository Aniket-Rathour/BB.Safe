import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-32 px-10">
      <h1 className="text-5xl font-extralight mb-10 text-yellow-500">Profile</h1>
      <div className="bg-white/5 p-10 rounded-3xl border border-white/10 max-w-xl">
        {/* Content goes here */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
          <div>
            <h2 className="text-2xl font-light">User Name</h2>
            <p className="text-gray-500">user@example.com</p>
          </div>
        </div>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-white/10 rounded-xl hover:bg-white/5 transition">Emergency Contacts</button>
          <button className="w-full text-left p-4 border border-white/10 rounded-xl hover:bg-white/5 transition">Privacy Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
