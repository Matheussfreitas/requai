import { gemini } from "./client";

export class GeminiService {
  async analyzeAmbiguity(requirements: string[]) {
    const prompt = `
      Analise os requisitos abaixo e identifique termos ambíguos, subjetivos ou vagos.

      Requisitos:
      ${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

      Para cada requisito, responda:
      - O requisito original
      - Termos ambíguos encontrados
      - Justificativa
    `;

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          text: prompt,
        },
      ],
    });
    return response.text;
  }

  async improveRequirements(requirements: string[]) {
    const prompt = `
      Reescreva os seguintes requisitos de forma clara, objetiva e sem ambiguidade. Evite termos vagos, subjetivos ou indefinidos. Mantenha o significado original, mas melhore a precisão e clareza.

      Requisitos:
      ${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

      Formato da resposta:
      - Original:
      - Reescrito:
    `;

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          text: prompt,
        },
      ],
    });
    return response.text;
  }
}
