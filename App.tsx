
import React, { useState, useCallback, useEffect } from 'react';
import { expandPrompt, generateVideo } from './services/geminiService';
import { VideoStyle, GalleryItem } from './types';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import VideoPlayer from './components/VideoPlayer';
import Gallery from './components/Gallery';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<VideoStyle>(VideoStyle.Cinematic);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [videoGallery, setVideoGallery] = useState<GalleryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadingMessages = [
    "Warming up the digital cameras...",
    "Composing the perfect shot...",
    "Consulting with the AI director...",
    "Rendering the first few frames...",
    "Applying cinematic color grading...",
    "Adding sound design elements...",
    "This is taking a bit longer than usual, but good things come to those who wait.",
    "Almost there, the final scene is coming to life!",
  ];

  useEffect(() => {
    // FIX: Use `ReturnType<typeof setInterval>` for browser compatibility instead of `NodeJS.Timeout`.
    let interval: ReturnType<typeof setInterval>;
    if (isLoading && loadingMessage.startsWith("Creating video")) {
      let messageIndex = 0;
      interval = setInterval(() => {
        setLoadingMessage(`Creating video: ${loadingMessages[messageIndex % loadingMessages.length]}`);
        messageIndex++;
      }, 4000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, loadingMessage]);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate a video.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setCurrentVideoUrl(null);
    setLoadingMessage("Expanding your idea into a cinematic prompt...");

    try {
      const expandedPrompt = await expandPrompt(prompt, style);
      setLoadingMessage(`Creating video: ${loadingMessages[0]}`);

      const videoUri = await generateVideo(expandedPrompt);
      const videoUrl = `${videoUri}&key=${process.env.API_KEY}`;
      
      setCurrentVideoUrl(videoUrl);
      setVideoGallery(prevGallery => [{ url: videoUrl, prompt: expandedPrompt }, ...prevGallery]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during video generation.");
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [prompt, style, loadingMessages]);

  const handleSelectFromGallery = (url: string) => {
    setCurrentVideoUrl(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            style={style}
            setStyle={setStyle}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          {error && <div className="mt-4 p-3 bg-red-500/20 text-red-300 border border-red-500 rounded-lg text-center">{error}</div>}
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          {isLoading && <Loader message={loadingMessage} />}
          {!isLoading && currentVideoUrl && <VideoPlayer videoUrl={currentVideoUrl} />}
        </div>
        
        {!isLoading && videoGallery.length > 0 && (
          <Gallery items={videoGallery} onSelect={handleSelectFromGallery} />
        )}
      </main>
    </div>
  );
};

export default App;
