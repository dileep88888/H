
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600 mb-2">
        Veo Video Studio
      </h1>
      <p className="text-lg text-gray-400">
        Turn your ideas into cinematic reality. Powered by Gemini & Veo.
      </p>
    </header>
  );
};

export default Header;
