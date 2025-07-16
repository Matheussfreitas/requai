import { AnalyzeDto } from '@/app/types/analyze-dto';
import { GeminiService } from '@/lib/gemini/gemini-service';
import { NextRequest, NextResponse } from 'next/server';

const geminiService = new GeminiService();

export async function POST(req: NextRequest) {
  try {
    const dto = (await req.json()) as AnalyzeDto;
    console.log('Received DTO for improvement:', dto);

    if (!dto.requirements || !Array.isArray(dto.requirements)) {
      return NextResponse.json({ error: 'Requirements must be an array of strings' }, { status: 400 });
    }

    const result = await geminiService.improveRequirements(dto.requirements);
    
    // Log para debug
    console.log('Raw Gemini response (improve):', result);
    
    // Verificar se o resultado existe e tentar fazer parse
    if (!result) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }
    
    // Tentar fazer parse do JSON retornado pelo Gemini
    try {
      const parsedResult = JSON.parse(result);
      return NextResponse.json(parsedResult);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      // Se não conseguir fazer parse, retornar como string
      return NextResponse.json({ error: 'Invalid response format from AI', rawResponse: result }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in improve-requirements API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
