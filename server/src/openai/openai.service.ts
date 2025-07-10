import { openai } from './../shared/openai-client';
import { Injectable } from '@nestjs/common';
import { buildAmbiguityPrompt } from './prompts/ambiquity.prompt';
import { buildRewritePrompt } from './prompts/rewrite.prompt';

@Injectable()
export class OpenAIService {
  async analyzeAmbiguity(requirements: string[]) {
    const prompt = buildAmbiguityPrompt(requirements);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista em análise de requisitos de software.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    return completion.choices[0].message.content;
  }

  async improveRequirements(requirements: string[]) {
    const prompt = buildRewritePrompt(requirements);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista em reescrita de requisitos de software.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    return completion.choices[0].message.content;
  }
}
