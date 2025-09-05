
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700 shadow-2xl">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-200">Generated Video</h2>
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <video
          key={videoUrl}
          className="w-full h-full"
          controls
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
