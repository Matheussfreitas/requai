import { AnalyzeDto } from '@/app/types/analyze-dto';
import { GeminiService } from '@/lib/gemini/gemini-service';
import { NextRequest, NextResponse } from 'next/server';


const geminiService = new GeminiService();

export async function POST(req: NextRequest) {
  const dto = (await req.json()) as AnalyzeDto;
  console.log('Received DTO:', dto);

  if (!dto.requirements || !Array.isArray(dto.requirements)) {
    return NextResponse.json({ error: 'Requirements must be an array of strings' }, { status: 400 });
  }

  const result = await geminiService.analyzeAmbiguity(dto.requirements);
  return NextResponse.json(result);
}
