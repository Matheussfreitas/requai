import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY não encontrada nas variáveis de ambiente');
}

export const gemini = new GoogleGenAI({
  apiKey: apiKey,
});

console.log('Gemini client initialized');
