
import React from 'react';
import { VideoStyle } from '../types';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  style: VideoStyle;
  setStyle: (style: VideoStyle) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const StyleButton: React.FC<{
  label: VideoStyle;
  currentStyle: VideoStyle;
  setStyle: (style: VideoStyle) => void;
}> = ({ label, currentStyle, setStyle }) => {
  const isSelected = label === currentStyle;
  return (
    <button
      onClick={() => setStyle(label)}
      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105
        ${isSelected
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
    >
      {label}
    </button>
  );
};

const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, style, setStyle, onSubmit, isLoading }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          1. Describe your video idea
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={3}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none placeholder-gray-500"
          placeholder="e.g., A robot exploring a futuristic, neon-lit city at night"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          2. Select a style
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.values(VideoStyle).map((s) => (
            <StyleButton key={s} label={s} currentStyle={style} setStyle={setStyle} />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          '✨ Generate Video'
        )}
      </button>
    </form>
  );
};

export default PromptForm;
