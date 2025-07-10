import { Module } from '@nestjs/common';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [OpenAIModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
