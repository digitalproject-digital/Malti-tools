
import { GoogleGenAI } from "@google/genai";

export async function processWithAI(prompt: string, toolContext: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: You are a professional utility tool assistant. 
                 Task: Perform the action for the tool "${toolContext}".
                 Input Data: "${prompt}"
                 Rules: Return only the processed output without any conversational filler or markdown blocks unless requested.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini processing error:", error);
    return "Error processing with AI. Please check your input or try again later.";
  }
}
