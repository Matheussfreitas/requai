import { GoogleGenAI } from '@google/genai';

export const gemini = new GoogleGenAI({
  apiKey: 'AIzaSyDtEols0cgKpLUTtkdNT-dEdPlb2mpNMM8',
});

console.log(
  'Gemini client initialized with API key:',
  'AIzaSyDtEols0cgKpLUTtkdNT-dEdPlb2mpNMM8',
);
