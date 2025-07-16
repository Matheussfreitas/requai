import { gemini } from "./client";

export class GeminiService {
  async analyzeAmbiguity(requirements: string[]) {
    const prompt = `
      Você é um assistente especializado em Engenharia de Requisitos. Sua tarefa é analisar uma lista de requisitos e identificar termos ambíguos, subjetivos ou vagos que possam comprometer a clareza e a implementação correta do sistema.

      Para cada requisito, siga as instruções abaixo:

      1. Reproduza o requisito original exatamente como recebido.
      2. Identifique termos ambíguos ou subjetivos.
      3. Justifique por que esses termos são considerados ambíguos.
      4. Caso não haja ambiguidade, informe claramente que o requisito é claro e objetivo.

      IMPORTANTE: Retorne APENAS o JSON válido, sem texto adicional antes ou depois.

      ### Formato de saída (JSON):

      [
        {
          "id": 1,
          "original": "Texto original do requisito.",
          "termosAmbiguos": ["termo1", "termo2"],
          "justificativa": "Explicação do porquê os termos são considerados ambíguos ou subjetivos."
        },
        {
          "id": 2,
          "original": "Texto original do requisito.",
          "termosAmbiguos": [],
          "justificativa": "O requisito está claro e não contém termos ambíguos."
        }
      ]

      ### Requisitos:
      ${requirements.map((r, i) => `${i + 1}. ${r}`).join("\n")}
      `;

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: prompt,
        },
      ],
    });
    
    const responseText = response.text;
    
    // Tentar limpar a resposta se ela tiver markdown ou texto extra
    if (responseText) {
      // Remover markdown code blocks se existirem
      const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return cleanedText;
    }
    
    return responseText;
  }

  async improveRequirements(requirements: string[]) {
    const prompt = `
      Você é um especialista em Engenharia de Requisitos. Sua tarefa é reescrever uma lista de requisitos de forma mais clara, objetiva e precisa, evitando qualquer ambiguidade, subjetividade ou termos vagos. 

      Para cada requisito, siga as instruções abaixo:

      1. Mantenha o significado original do requisito.
      2. Substitua palavras imprecisas por expressões mensuráveis, técnicas ou verificáveis.
      3. Não omita nenhum comportamento importante descrito no requisito original.
      4. Caso o requisito já esteja claro, apenas reescreva com ajustes mínimos de clareza e padronização textual.

      IMPORTANTE: Retorne APENAS o JSON válido, sem texto adicional antes ou depois.

      ### Formato de saída (JSON):
      [
        {
          "id": 1,
          "original": "Texto original do requisito.",
          "reescrito": "Texto reescrito com maior clareza e objetividade."
        },
        {
          "id": 2,
          "original": "Texto original do requisito.",
          "reescrito": "Texto reescrito com maior clareza e objetividade."
        }
      ]

      ### Requisitos:
      ${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}
      `;


    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: prompt,
        },
      ],
    });
    
    const responseText = response.text;
    
    // Tentar limpar a resposta se ela tiver markdown ou texto extra
    if (responseText) {
      // Remover markdown code blocks se existirem
      const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return cleanedText;
    }
    
    return responseText;
  }
}
