import { OpenAIService } from './openai.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzeDto } from './dto/analyze.dto';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}
  @Post('analyze-ambiguity')
  async analyzeAmbiguity(@Body() dto: AnalyzeDto) {
    return await this.openAIService.analyzeAmbiguity(dto.requirements);
  }

  @Post('improve-requirements')
  async improve(@Body() dto: AnalyzeDto) {
    return await this.openAIService.improveRequirements(dto.requirements);
  }
}
