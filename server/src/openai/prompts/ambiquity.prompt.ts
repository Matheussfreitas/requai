export function buildAmbiguityPrompt(requirements: string[]) {
  return `Analise os requisitos abaixo e identifique termos ambíguos, subjetivos ou vagos.

  Requisitos:
  ${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

  Para cada requisito, responda:
  - O requisito original
  - Termos ambíguos encontrados
  - Justificativa
  `;
}
