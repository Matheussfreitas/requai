import { GeminiService } from './gemini.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzeDto } from './dto/analyze.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}
  @Post('analyze-ambiguity')
  async analyzeAmbiguity(@Body() dto: AnalyzeDto) {
    return await this.geminiService.analyzeAmbiguity(dto.requirements);
  }

  @Post('improve-requirements')
  async improve(@Body() dto: AnalyzeDto) {
    return await this.geminiService.improveRequirements(dto.requirements);
  }
}
