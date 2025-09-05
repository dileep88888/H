
import React from 'react';
import { GalleryItem } from '../types';

interface GalleryProps {
  items: GalleryItem[];
  onSelect: (url: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ items, onSelect }) => {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
        Session Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-800 shadow-lg border border-gray-700 transition-transform duration-300 transform hover:scale-105 hover:shadow-indigo-500/30"
            onClick={() => onSelect(item.url)}
          >
            <video
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              onMouseOver={e => (e.target as HTMLVideoElement).play()}
              onMouseOut={e => (e.target as HTMLVideoElement).pause()}
              src={item.url}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <p className="text-white text-center text-sm">
                {item.prompt.substring(0, 100)}{item.prompt.length > 100 && '...'}
              </p>
            </div>
             <div className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
