export function buildRewritePrompt(requirements: string[]) {
  return `Reescreva os seguintes requisitos de forma clara, objetiva e sem ambiguidade. Evite termos vagos, subjetivos ou indefinidos. Mantenha o significado original, mas melhore a precisão e clareza.

  Requisitos:
  ${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

  Formato da resposta:
  - Original:
  - Reescrito:
  `;
}
