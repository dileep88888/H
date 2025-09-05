import { GoogleGenAI } from "@google/genai";
import { VideoStyle } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const expandPrompt = async (prompt: string, style: VideoStyle): Promise<string> => {
  const model = 'gemini-2.5-flash';
  const fullPrompt = `
    You are a creative assistant for a video generation AI.
    Your task is to expand a user's simple idea into a rich, descriptive, and cinematic scene description that the video AI can use.
    The description should be a single paragraph, focusing on visual details, camera movement, lighting, and mood. Do not describe audio.
    The target video length is short, about 5-10 seconds.
    
    Style: ${style}
    User Idea: "${prompt}"

    Generate the expanded scene description now.
  `;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error expanding prompt:", error);
    throw new Error("Failed to expand prompt with Gemini.");
  }
};


export const generateVideo = async (expandedPrompt: string): Promise<string> => {
    const model = 'veo-2.0-generate-001';
    try {
        let operation = await ai.models.generateVideos({
            model,
            prompt: expandedPrompt,
            config: {
                numberOfVideos: 1
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }
        
        // FIX: Check if the long-running operation completed with an error
        if (operation.error) {
            const errorMessage = (operation.error as any).message || 'The video generation operation failed without a specific message.';
            console.error("Video Generation Operation Error:", operation.error);
            throw new Error(errorMessage);
        }
        
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) {
            throw new Error("Video URI not found in API response after a successful operation.");
        }
        
        return downloadLink;

    } catch (error) {
        console.error("Error generating video:", error);
        // Propagate the specific error message to the UI instead of a generic one.
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("An unknown error occurred during video generation.");
    }
};