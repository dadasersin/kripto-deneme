
import { GoogleGenAI, Type, Modality } from "@google/genai";

export class AIService {
  async generateImage(prompt: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      const candidates = response.candidates;
      if (!candidates || candidates.length === 0) {
        throw new Error("Model yanıt vermedi.");
      }

      const parts = candidates[0].content?.parts;
      if (!parts) {
        throw new Error("Görsel verisi bulunamadı.");
      }

      for (const part of parts) {
        if (part.inlineData) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          const base64Data = part.inlineData.data;
          return `data:${mimeType};base64,${base64Data}`;
        }
      }

      const finishReason = candidates[0].finishReason;
      if (finishReason === 'SAFETY') {
        throw new Error("İçerik güvenlik filtresine takıldı. Lütfen farklı bir komut deneyin.");
      }

      throw new Error("Görsel verisi yanıtta bulunamadı.");
    } catch (error: any) {
      console.error("Image Generation Error:", error);
      throw new Error(error.message || "Görsel oluşturma sırasında teknik bir hata oluştu.");
    }
  }

  async searchWithGrounding(query: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      return {
        text: response.text || "Yanıt oluşturulamadı.",
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (error) {
      console.error("Search Grounding Error:", error);
      throw error;
    }
  }

  async textToSpeech(text: string, voiceName: string = 'Kore') {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say this naturally: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("Ses verisi üretilemedi.");
      return base64Audio;
    } catch (error) {
      console.error("TTS Error:", error);
      throw error;
    }
  }

  async generateAppIdea(category: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a modular mobile app idea for the category: ${category}. Suggest 5 components and a brief description.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              appName: { type: Type.STRING },
              description: { type: Type.STRING },
              components: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("App Idea Gen Error:", error);
      return { appName: "Hata", description: "Fikir oluşturulamadı.", components: [] };
    }
  }
}

export const aiService = new AIService();
