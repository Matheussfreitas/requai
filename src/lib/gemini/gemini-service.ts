import { gemini } from "./client";

export class GeminiService {
  async analyzeAmbiguity(requirements: string[]) {
    const prompt = `
      Você é um assistente especializado em Engenharia de Requisitos. Sua tarefa é analisar uma lista de textos e:

      1. PRIMEIRO: Validar se cada texto é realmente um requisito de software (funcional ou não-funcional)
      2. SEGUNDO: Para textos que são requisitos válidos, identificar termos ambíguos, subjetivos ou vagos
      
      CRITÉRIOS PARA REQUISITOS VÁLIDOS:
      - Descreve uma funcionalidade, comportamento ou restrição do sistema
      - Especifica o que o sistema deve fazer ou como deve se comportar
      - Pode ser um requisito funcional (o que fazer) ou não-funcional (como fazer)
      - Não são perguntas, comentários gerais, ou textos não relacionados ao software

      Para cada texto, siga as instruções abaixo:

      1. Reproduza o texto original exatamente como recebido.
      2. Se NÃO for um requisito válido, coloque "não é um requisito" em termosAmbiguos e explique na justificativa.
      3. Se FOR um requisito válido, identifique termos ambíguos ou subjetivos.
      4. Justifique sua análise.

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
        },
        {
          "id": 3,
          "original": "Texto que não é um requisito.",
          "termosAmbiguos": ["não é um requisito"],
          "justificativa": "Este texto não representa um requisito de software válido. É apenas um comentário/pergunta/texto genérico."
        }
      ]

      ### Textos para análise:
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
      Você é um especialista em Engenharia de Requisitos. Sua tarefa é:

      1. PRIMEIRO: Validar se cada texto é realmente um requisito de software (funcional ou não-funcional)
      2. SEGUNDO: Para textos que são requisitos válidos, reescrevê-los de forma mais clara, objetiva e precisa
      
      CRITÉRIOS PARA REQUISITOS VÁLIDOS:
      - Descreve uma funcionalidade, comportamento ou restrição do sistema
      - Especifica o que o sistema deve fazer ou como deve se comportar
      - Pode ser um requisito funcional (o que fazer) ou não-funcional (como fazer)
      - Não são perguntas, comentários gerais, ou textos não relacionados ao software

      Para cada texto, siga as instruções abaixo:

      1. Mantenha o texto original.
      2. Se NÃO for um requisito válido, coloque "Este texto não representa um requisito de software válido" no campo reescrito.
      3. Se FOR um requisito válido, reescreva-o com maior clareza, substituindo palavras imprecisas por expressões mensuráveis, técnicas ou verificáveis.
      4. Não omita nenhum comportamento importante descrito no texto original.

      IMPORTANTE: Retorne APENAS o JSON válido, sem texto adicional antes ou depois.

      OBSERVAÇÃO: Se após a análise um texto não for um requisito válido, mantenha o original e indique no reescrito que não é um requisito.

      ### Formato de saída (JSON):
      [
        {
          "id": 1,
          "original": "Texto original do requisito.",
          "reescrito": "Texto reescrito com maior clareza e objetividade."
        },
        {
          "id": 2,
          "original": "Texto que não é um requisito.",
          "reescrito": "Este texto não representa um requisito de software válido. É apenas um comentário/pergunta/texto genérico."
        }
      ]

      ### Textos para análise:
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
