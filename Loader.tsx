
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-2xl border border-gray-700 shadow-xl space-y-4">
       <svg className="w-16 h-16 text-indigo-400" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="10" fill="none" strokeDasharray="283" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" values="283;0;283" dur="3s" repeatCount="indefinite" />
        </circle>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#818cf8' }} />
            <stop offset="100%" style={{ stopColor: '#6366f1' }} />
          </linearGradient>
        </defs>
      </svg>
      <p className="text-lg text-gray-300 text-center animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
